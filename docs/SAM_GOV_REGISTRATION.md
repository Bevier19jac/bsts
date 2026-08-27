# SAM.gov registration — pre-flight pack

Canonical entity facts come from `BSTS_ENTITY_STANDARD.md`. If this file and that
one ever disagree, **the entity standard wins and this file is stale.**

*Prepared 27 August 2026.*

---

## 0. Read this first

**Registration is free.** SAM.gov never charges to register, renew, or issue a
UEI or CAGE code. Every site that offers to do it for a fee is either a reseller
of a free service or a scam. Some rank above SAM.gov itself in search results and
use `.us` / `.org` domains with official-looking seals.

The only correct address is **`https://sam.gov`**. Nothing else.

---

## 1. Where the line is on who does what

Some of this registration cannot be delegated — not as a matter of preference, but
because the steps are personal legal acts or involve credentials and bank details.

| Step | Who |
|---|---|
| Create the Login.gov account, set the password, enrol MFA | **Owner only** |
| Enter the EFT banking routing and account numbers | **Owner only** |
| Sign the Entity Administrator letter before a notary | **Owner only** |
| Complete Representations & Certifications (FAR reps and certs) | **Owner only** |
| Deciding NAICS, size, and service-area answers | Owner, advised |
| Assembling and checking the data below before you start | Prepared here |

The reps and certs are signed under penalty of perjury and bind the company in
federal contracting. They are the owner's signature, not an assistant's, and not a
place to guess. Read each one.

---

## 2. The single most common cause of rejection

**The legal business name and physical address must match your official records
character for character.** Not "close enough". SAM runs two independent checks —
entity validation against state and public records, and a TIN match against the
IRS — and a mismatch in either parks the registration in *Work in Progress* or
*Submitted* for weeks with no useful error.

### Confirmed against the CP 575G, 27 August 2026

The notice reads **all capitals, no periods**. Verified against the document.

```
BEVIER STRATEGIC TECHNOLOGY SOLUTIONS LLC
```

What that does and does not tell you:

- **`LLC`, not `L.L.C.` — no periods.** This is the load-bearing part. A stray
  period or a comma before the suffix is exactly the kind of difference that
  silently fails the match.
- **No comma before `LLC`.**
- **The all-capitals is not part of the legal name.** IRS notices print entity
  names in all caps as a system convention; the name filed with Georgia is
  `Bevier Strategic Technology Solutions LLC` in mixed case, and that is the
  legally correct form for contracts, insurance certificates and signature
  blocks. Do not start writing the company name in block capitals because the
  CP 575 does.
- On case in SAM specifically: no authoritative source states that entity
  validation is case-sensitive, and every source that discusses failures points
  at punctuation, abbreviations and address format instead. **Type it as filed
  with Georgia.** If validation returns a record with different capitalisation,
  accept what it returns rather than fighting it.

### There are two separate matches, and they check different things

Conflating these is why people chase the wrong fix for a week.

| Check | Compares against | Keys on |
|---|---|---|
| **Entity validation** | State / public records — the Georgia filing | Legal name **and physical address together** |
| **TIN match** | IRS records | EIN plus the **name control `BEVI`** |

So the address only matters to the first one, and the name control only to the
second. A failure message that mentions the address is an entity-validation
problem, not an IRS problem.

Address must be **mail-deliverable and physical**. P.O. boxes are rejected.
105 Pendleton Trail, Tyrone, GA 30290 is the registered office and is what both
the Georgia filing and the IRS have.

### If validation fails anyway

SAM accepts documentary evidence to resolve it, but with one specific
requirement: **at least one document must show the current legal name and the
physical address together.** Acceptable: state formation documents, the IRS EIN
letter, a business licence, or a bank statement or utility bill under five years
old.

You already have two that qualify, both filed under `_Corporate Records/`:

- the Georgia **Certificate of Organization**
- the **IRS Notice CP 575G**

Have both open before you start.

**Put the CP 575G and the Certificate of Organization side by side with the
screen before typing anything.** Ten minutes here saves two weeks of validation
limbo.

> Note the tension with the Google Business Profile decision: there, the address is
> deliberately hidden because a GBP publishes a map pin. SAM is different — the
> address is required, and SAM registrations are a public database. This is a real
> tradeoff and it is being made knowingly, not overlooked. Federal contracting is
> not compatible with a hidden principal office.

---

## 3. NAICS codes — the decision

You may list many. **The primary is the one that matters**, because it sets your
size standard and drives how contracting officers find you.

### Recommended

| Rank | Code | Title | Why |
|---|---|---|---|
| **Primary** | **541512** | Computer Systems Design Services | The workhorse code for IT services procurement. Covers systems integration, IT architecture, security architecture and implementation. More federal IT dollars flow through 541512 than any neighbouring code, and it is the one most set-asides in this space are written against. |
| Secondary | 541519 | Other Computer Related Services | Where incident response, tooling and hardware-agnostic support land. Natural companion to 541512. |
| Secondary | 541690 | Other Scientific and Technical Consulting Services | The advisory lane — governance, risk, security advisory that is not implementation. |
| Secondary | 541611 | Administrative Management and General Management Consulting | Broad management consulting. Worth listing, but see the warning below. |

### Why 541512 as primary and not the alternatives

- **Not 541611 as primary.** Its size standard is lower (management consulting sits
  around $24.5M in receipts versus $34M for the 54151x family), and more
  importantly it pulls BSTS into the general-management-consulting pool, away from
  the technical credibility that is the actual differentiator. Same mistake as
  letting Google file the business under "Computer support and services".
- **Not 541511** (Custom Computer Programming). BSTS integrates and advises; it is
  not primarily a bespoke software shop.
- **Cybersecurity has no dedicated NAICS code.** It is split across 541512,
  541519 and 541690 depending on whether the work is architecture, response, or
  advisory. This is why all three belong on the list.

### Confirm before you commit

Size standards are being actively revised — SBA has a sweeping overhaul of size
standards in proposed rulemaking. **Check the current SBA size standard for your
primary code on the SBA table at registration time** rather than trusting the
figures above. They are directionally right and may be stale on the exact dollar.

---

## 4. Data pack — everything SAM will ask for

Fill from here, not from memory.

### Entity

| Field | Value |
|---|---|
| Legal business name | `Bevier Strategic Technology Solutions LLC` — no periods in `LLC`, no comma before it. Confirmed against the CP 575G, 27 Aug 2026. See §2 on capitalisation. |
| Doing business as | `Bevier Strategic Technology Solutions` — or leave blank |
| Physical address | 105 Pendleton Trail, Tyrone, GA 30290 |
| Mailing address | Same |
| Entity structure | Limited Liability Company |
| State of incorporation | Georgia |
| Date of incorporation | 20 August 2026 |
| Fiscal year end | 31 December (confirm — this is the default, and it is what the Operating Agreement assumes) |
| Country of incorporation | United States |
| EIN / TIN | On the CP 575G. **Type it from the notice.** |
| IRS name control | `BEVI` |
| Website | `https://bevierstrategic.com` |

### Business types to claim

| Claim | Status |
|---|---|
| Small business | Yes |
| Service-disabled veteran-owned small business | **Yes — self-certified.** See the warning below. |
| Veteran-owned small business | Yes |
| Sole proprietorship | **No** — it is an LLC |
| Women-owned / HUBZone / 8(a) | No |

> **The SDVOSB wording matters.** SAM self-certification is not the same as SBA
> VetCert certification. As of today VetCert is **not held** and the application is
> not filed. Claim veteran and service-disabled veteran ownership — both true — but
> **do not represent the company as a certified SDVOSB** anywhere, and do not
> pursue SDVOSB set-aside awards on the strength of a SAM self-certification alone.
> In federal contracting an uncertified SDVOSB claim is not a marketing
> exaggeration; it carries False Claims Act exposure.

### Points of contact

SAM requires several POC roles. For a single-member LLC they are all the same
person. Have ready: full legal name, title, the physical address above, phone, and
email.

Use a **role-based email you will keep** — `contact@bevierstrategic.com` routes to
the business mailbox and survives any change of personal address.

### Banking (EFT)

Routing number and account number for the Chase business account. **The owner
enters these directly.** They are not written down here, and they should not be
put in a document, a chat, or a shared file.

---

## 5. Order of operations

1. **Login.gov account** — create it with the business email, enrol MFA. Use a
   password manager. This account becomes the key to the entire registration; if
   it is lost, recovery is painful.
2. **Request the UEI** — this is now issued by SAM directly. DUNS is long dead.
   Entity validation happens here, and this is where a name/address mismatch bites.
3. **Complete the core data** — the table in §4.
4. **Assertions** — NAICS codes from §3, size metrics.
5. **Representations & certifications** — read them.
6. **Points of contact.**
7. **Submit.** Then wait.

### Timeline

- **UEI**: often same-day to a few days once entity validation clears.
- **CAGE code**: assigned after submission, typically the long pole.
- **Full active registration**: plan on **10 business days**, and do not be alarmed
  before then.
- **If status has not moved after 14 business days**, there is a validation
  problem — usually IRS data mismatch or CAGE validation. Open a SAM.gov help
  ticket rather than resubmitting.

### The notarized letter

An Entity Administrator letter on company letterhead, signed before a notary, is
part of the process. **Remote online notarization is accepted**, which means this
does not require a trip anywhere. Draft it only after the UEI is issued, because
the letter must reference the UEI.

---

## 6. What this unblocks

Nothing downstream can start until SAM is active:

- **SBA VetCert** (SDVOSB certification) requires an active SAM registration
- **CAGE code** is issued through the SAM process
- Any federal solicitation response requires active SAM status

This is why SAM is the long pole and worth starting before it is needed.

---

## 7. After it goes active

1. Record the **UEI** and **CAGE code** in `BSTS_ENTITY_STANDARD.md` §10.
2. Note the date in
   `_Corporate Records/BSTS_Formation_and_Compliance_Register.md`.
3. **Set a renewal reminder for 11 months out.** SAM registration expires
   annually, and an expired registration makes the company ineligible for award
   overnight, with no grace period. This is the single most common way small
   businesses lose a contract they had already won.
4. Start the **SBA VetCert** application.
