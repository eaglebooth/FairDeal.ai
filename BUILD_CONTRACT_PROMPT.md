# FairDeal.ai — Smart Contract Build Prompt
# Copy toàn bộ nội dung này và paste vào Claude Code để build smart contract
# File output: C:\Users\admin\OneDrive\Documents\Genlayer\FairDeal.ai\contract\FairDeal.py

---

Build a production-ready GenLayer Intelligent Contract for "FairDeal.ai" — an autonomous AI arbitration platform for e-commerce and freelance disputes.

## REFERENCE CONTRACT
Study this existing GenLayer contract for patterns and conventions:
- File: C:\Users\admin\OneDrive\Documents\Genlayer\GenGrant\GenGrant.py
- Version: v0.2.16
- Dependency: py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6

## CONTRACT SPECIFICATION

### Core Concept
FairDeal.ai is an autonomous arbitration platform. Two parties lock funds in escrow, submit evidence URLs, and AI validators read all evidence + contract text, analyze using LLM reasoning, reach byte-identical consensus verdict, and the smart contract automatically executes the outcome (release funds or refund).

### Key Technical Requirements

#### 1. Pattern MANDATORY from GenGrant.py
- All `gl.nondet.web.get()` calls must be inside a local function
- That local function is passed to `gl.eq_principle.strict_eq(local_fn)`
- The LLM response from `strict_eq` must be parsed with `json.loads()`
- Truncate fetched content to ~4000 chars before including in prompts

#### 2. Data Structures Needed

**Dispute Program (like Grant Program in GenGrant):**
- program_id: u256
- program_title: str
- program_description: str
- program_escrow_token: str (which token to escrow, e.g., "USDC")
- program_arbitration_fee_pct: u256 (e.g., 200 = 2.00%)
- program_challenge_window_blocks: u256 (how many blocks to wait before auto-execute)
- program_status: str ("ACTIVE" / "CLOSED")

**Dispute Application (like Grant Application in GenGrant):**
- dispute_id: u256
- program_id: u256
- plaintiff: str (wallet address)
- defendant: str (wallet address)
- contract_text_url: str (URL to contract/agreement text)
- plaintiff_evidence_urls: DynArray[str] (max 5 URLs)
- defendant_evidence_urls: DynArray[str] (max 5 URLs)
- dispute_type: str ("ECOMMERCE" / "FREELANCE" / "SLA" / "B2B" / "OTHER")
- escrow_amount: u256 (amount locked)
- status: str ("PENDING" / "EVIDENCE_SUBMITTED" / "VERDICT_REACHED" / "EXECUTED" / "CHALLENGED")
- verdict: str (JSON string: verdict details)
- verdict_confidence: u256
- created_at: u256 (block timestamp)
- verdict_at: u256
- challenge_deadline: u256

**Treasury/Ledger (like GenGrant treasury):**
- ledger_recipients: DynArray[str]
- ledger_amounts: DynArray[u256]
- ledger_dispute_ids: DynArray[u256]
- ledger_timestamps: DynArray[u256]
- ledger_count: u256

#### 3. Required Functions

**Program Management:**
```python
@gl.public.write
def create_arbitration_program(self, title: str, description: str, fee_pct: u256, challenge_blocks: u256) -> u256
```
Creates a new arbitration program (like a marketplace category). Returns program_id.

```python
@gl.public.view
def get_program(self, program_id: u256) -> dict-like (return JSON string with all program info)
```

**Dispute Lifecycle:**
```python
@gl.public.write
def create_dispute(self, program_id: u256, plaintiff: str, defendant: str, contract_url: str, p_evidence_urls: DynArray[str], d_evidence_urls: DynArray[str], dispute_type: str, escrow_amount: u256) -> u256
```
Creates a new dispute. Both parties must have deposited escrow. Returns dispute_id.

```python
@gl.public.write
def submit_evidence(self, dispute_id: u256, party: str, evidence_urls: DynArray[str]) -> str
```
Allows either party to submit additional evidence before verdict.

**AI Evaluation (THE CORE):**
```python
@gl.public.write
def evaluate_dispute(self, dispute_id: u256) -> str
```
This is the main AI arbitration function. Must follow strict_eq pattern:

1. Fetch contract text from `contract_text_url`
2. Fetch all evidence URLs from both plaintiff and defendant
3. Truncate each to 4000 chars
4. Build a comprehensive prompt for the LLM arbitrator
5. Call `gl.nondet.exec_prompt()` inside the local function
6. Wrap with `gl.eq_principle.strict_eq()`
7. Parse JSON response
8. Store verdict on-chain

**The LLM Prompt Template (inside the contract):**
The prompt sent to exec_prompt should instruct the AI to:
- Act as a professional commercial arbitrator
- Read the contract/agreement text
- Read all evidence from both parties
- Apply commercial law standards and industry norms for the specific dispute_type
- Determine: breach_by (PLAINTIFF/DEFENDANT/BOTH/NEITHER), severity (MINOR/MATERAL/FUNDAMENTAL), remedy (FULL_REFUND/PARTIAL_REFUND/RELEASE_TO_DEFENDANT/PENALTY_DAMAGES), refund_percentage (0-100), reasoning (brief)
- Return ONLY valid JSON with this exact structure:
  ```json
  {
    "breach_by": "DEFENDANT",
    "severity": "MATERIAL",
    "remedy": "FULL_REFUND",
    "refund_percentage": 100,
    "reasoning": "Defendant failed to deliver product as described in contract section 3.2...",
    "confidence": 8,
    "violated_terms": ["Section 3.2", "Section 5.1"],
    "evidence_strength": {
      "plaintiff": "STRONG",
      "defendant": "WEAK"
    }
  }
  ```

**Verdict Execution:**
```python
@gl.public.write
def execute_verdict(self, dispute_id: u256) -> str
```
After challenge window expires, automatically execute the verdict:
- If remedy is FULL_REFUND or PARTIAL_REFUND: transfer escrow back to plaintiff
- If remedy is RELEASE_TO_DEFENDANT: transfer escrow to defendant
- If remedy is PENALTY_DAMAGES: split according to penalty calculation
- Record in treasury ledger

**Challenge Mechanism:**
```python
@gl.public.write
def challenge_verdict(self, dispute_id: u256, reason: str) -> str
```
Allows either party to challenge within the challenge window. Triggers a re-evaluation by a panel of 3 independent AI validators (different from original). If 2/3 agree with original → original stands. If 2/3 disagree → new verdict from panel.

**Query Functions:**
```python
@gl.public.view
def get_dispute(self, dispute_id: u256) -> str  # Returns JSON with all dispute info

@gl.public.view
def get_dispute_count(self) -> u256

@gl.public.view
def get_program_disputes(self, program_id: u256, index: u256) -> u256  # Returns dispute_id at index

@gl.public.view
def get_treasury_record(self, index: u256) -> str  # Returns JSON with treasury entry
```

## IMPLEMENTATION RULES

1. **Follow GenGrant.py patterns exactly:**
   - Storage declarations in class body (TreeMap[u256, str], TreeMap[u256, u256], DynArray[str], DynArray[u256], u256)
   - Constructor initializes count variables to u256(0)
   - @gl.public.write for state-changing functions
   - @gl.public.view for read-only functions
   - typing.Any return type for public write functions
   - Import: `from genlayer import *`, `import typing`, `import json`

2. **Error handling:**
   - Check IDs are in range before accessing TreeMap
   - Check status before allowing state transitions
   - Return descriptive error strings (not exceptions)

3. **Version header:**
   - First line: `# v0.1.0`
   - Second line: `# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }`

4. **The AI prompt must:**
   - Be clear about the role (professional arbitrator)
   - Include ALL fetched evidence inline in the prompt
   - Specify exact JSON output format
   - Include "Respond with ONLY this JSON, no other text or explanation" at the end
   - Be specific about the dispute_type context

5. **Truncation helper:**
   - Define a local `truncate(text, limit)` function inside the evaluate function
   - Apply to ALL fetched content before adding to prompt

6. **Escrow logic:**
   - For MVP, escrow is simulated (funds are tracked in contract state)
   - In production, this would integrate with actual token transfers
   - Record escrow deposits in a separate escrow tracking structure

## OUTPUT REQUIREMENTS

1. Create the complete FairDeal.py contract file
2. Include detailed comments explaining each section
3. Include a header docstring explaining the contract's purpose
4. Follow Python naming conventions (snake_case for internal, camelCase for on-chain storage keys)
5. Make the contract deployable on GenLayer testnet "Bradbury"
6. Include a brief README section at the top of the file explaining:
   - What this contract does
   - How to deploy
   - How to interact with it
   - Known limitations (MVP scope)

## TESTING NOTES
- The contract should work with GenLayer Studio local development
- All web.get() calls should handle potential fetch failures gracefully
- JSON parsing should handle edge cases (extra whitespace, markdown code blocks in LLM response)
- The strict_eq consensus should work with diverse LLM backends

---

Build this contract now. Make it production-quality, well-documented, and follow all GenLayer conventions from the reference contract.
