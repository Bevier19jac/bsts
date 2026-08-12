#!/usr/bin/env python3
"""
Physical fold simulation for a three-panel sheet.

Not a diagram — an actual model. The sheet is three panels, each with two
faces. A fold is a rotation of a contiguous run of the stack about a crease,
which reverses that run's order and flips every face in it. Run every legal
tri-fold and report which panel/face ends up as the front cover, which as the
back cover, and which is buried.

The question this answers: can a roll fold ever produce an outside face that
reads BACK | FOLD-IN | FRONT from left to right?
"""

from itertools import product

# A panel sits at a sheet position 1..3 and has two faces: "A" and "B".
# In the stack, an entry is (position, face_up, face_down).
POSITIONS = (1, 2, 3)


def flip(entry):
    pos, up, down = entry
    return (pos, down, up)


def fold(stack_by_pos, moving, target, ):
    """Rotate the run of panels at `moving` onto `target`. Returns a new map."""
    new = {p: list(v) for p, v in stack_by_pos.items()}
    run = new.pop(moving)
    # Rotating inverts the order of the run and flips every panel in it.
    rotated = [flip(e) for e in reversed(run)]
    new[target] = new.get(target, []) + rotated
    return new


def run_sequence(folds):
    """folds: list of (moving_position, target_position)."""
    # Start: flat sheet, side A up at every position.
    stack = {p: [(p, "A", "B")] for p in POSITIONS}
    live = {p: p for p in POSITIONS}  # sheet position -> current stack key
    for moving, target in folds:
        mkey, tkey = live[moving], live[target]
        if mkey == tkey:
            return None
        stack = fold(stack, mkey, tkey)
        # every sheet position that lived on the moving key now lives on target
        live = {p: (tkey if k == mkey else k) for p, k in live.items()}
    if len(stack) != 1:
        return None
    (_, pile), = stack.items()
    return pile  # bottom -> top


def describe(pile):
    bottom, top = pile[0], pile[-1]
    return {
        "front_cover": (top[0], top[1]),      # exposed upward when closed
        "back_cover": (bottom[0], bottom[2]),  # exposed downward when closed
        "buried": [e[0] for e in pile[1:-1]],
        "order_bottom_to_top": [e[0] for e in pile],
    }


def outside_face_layout(res):
    """Which sheet face carries the covers, and what it reads left to right."""
    fpos, fface = res["front_cover"]
    bpos, bface = res["back_cover"]
    if fface != bface:
        return None, "covers land on OPPOSITE faces (Z-fold behaviour)"
    face = fface
    role = {fpos: "FRONT COVER", bpos: "back cover"}
    for p in POSITIONS:
        role.setdefault(p, "fold-in flap")
    # Side A reads left-to-right as sheet positions 1,2,3.
    # Side B is the mirror: its leftmost panel is behind sheet position 3.
    order = list(POSITIONS) if face == "A" else list(reversed(POSITIONS))
    return face, " | ".join(role[p] for p in order)


SEQUENCES = {
    "roll, tuck the RIGHT panel first":  [(3, 2), (1, 2)],
    "roll, tuck the LEFT panel first":   [(1, 2), (3, 2)],
    "roll the pair rightward":           [(1, 2), (2, 3)],
    "roll the pair leftward":            [(3, 2), (2, 1)],
}

print("Every legal tri-fold of a three-panel sheet\n" + "=" * 72)
for name, seq in SEQUENCES.items():
    pile = run_sequence(seq)
    if pile is None:
        print(f"\n{name}: not a valid fold")
        continue
    res = describe(pile)
    face, layout = outside_face_layout(res)
    print(f"\n{name}")
    print(f"  stack bottom->top      panels {res['order_bottom_to_top']}")
    print(f"  front cover            panel {res['front_cover'][0]} face {res['front_cover'][1]}")
    print(f"  back cover             panel {res['back_cover'][0]} face {res['back_cover'][1]}")
    print(f"  tucked (middle layer)  panel {res['buried']}")
    if face is None:
        print(f"  outside face           {layout}")
    else:
        print(f"  outside face is side {face}, reading L->R:")
        print(f"     {layout}")

print("\n" + "=" * 72)
print("Requested layout: back cover | fold-in flap | FRONT COVER")
hits = []
for name, seq in SEQUENCES.items():
    pile = run_sequence(seq)
    if pile is None:
        continue
    _, layout = outside_face_layout(describe(pile))
    if layout == "back cover | fold-in flap | FRONT COVER":
        hits.append(name)
print("Produced by:", hits if hits else "NONE of the four")
