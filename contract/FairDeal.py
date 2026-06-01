# v0.2.16
# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }
from genlayer import *
import typing
import json


class FairDeal(gl.Contract):
    # ── Arbitration Programs ───────────────────────────────────────────────
    program_titles: TreeMap[u256, str]
    program_descriptions: TreeMap[u256, str]
    program_escrow_tokens: TreeMap[u256, str]
    program_arbitration_fee_pcts: TreeMap[u256, u256]
    program_challenge_window_blocks: TreeMap[u256, u256]
    program_statuses: TreeMap[u256, str]
    program_count: u256

    # Per-program dispute index (CSV list of dispute_ids — no DynArray in storage types)
    program_dispute_ids: TreeMap[u256, str]
    program_dispute_counts: TreeMap[u256, u256]

    # ── Disputes ───────────────────────────────────────────────────────────
    dispute_program_ids: TreeMap[u256, u256]
    dispute_plaintiffs: TreeMap[u256, str]
    dispute_defendants: TreeMap[u256, str]
    dispute_contract_text_urls: TreeMap[u256, str]
    dispute_p_evidence_urls: TreeMap[u256, str]
    dispute_d_evidence_urls: TreeMap[u256, str]
    dispute_types: TreeMap[u256, str]
    dispute_escrow_amounts: TreeMap[u256, u256]
    dispute_statuses: TreeMap[u256, str]
    dispute_verdicts: TreeMap[u256, str]
    dispute_verdict_confidences: TreeMap[u256, u256]
    dispute_created_ats: TreeMap[u256, u256]
    dispute_verdict_ats: TreeMap[u256, u256]
    dispute_challenge_deadlines: TreeMap[u256, u256]
    dispute_count: u256

    # ── Treasury / Execution Ledger ───────────────────────────────────────
    treasury_recipients: DynArray[str]
    treasury_amounts: DynArray[u256]
    treasury_dispute_ids: DynArray[u256]
    treasury_timestamps: DynArray[u256]
    treasury_count: u256

    # ═══════════════════════════════════════════════════════════════════════
    # INIT
    # ═══════════════════════════════════════════════════════════════════════

    def __init__(self):
        self.program_count = u256(0)
        self.dispute_count = u256(0)
        self.treasury_count = u256(0)

    # ═══════════════════════════════════════════════════════════════════════
    # PROGRAM MANAGEMENT
    # ═══════════════════════════════════════════════════════════════════════

    @gl.public.write
    def create_arbitration_program(
        self,
        title: str,
        description: str,
        escrow_token: str,
        arbitration_fee_pct: u256,
        challenge_window_blocks: u256,
    ) -> typing.Any:
        program_id = self.program_count
        self.program_titles[program_id] = title
        self.program_descriptions[program_id] = description
        self.program_escrow_tokens[program_id] = escrow_token
        self.program_arbitration_fee_pcts[program_id] = arbitration_fee_pct
        self.program_challenge_window_blocks[program_id] = challenge_window_blocks
        self.program_statuses[program_id] = "ACTIVE"
        self.program_count = program_id + u256(1)
        return program_id

    @gl.public.view
    def get_program(self, program_id: u256) -> str:
        if program_id >= self.program_count:
            return json.dumps({"error": "INVALID_PROGRAM_ID"})
        obj = {
            "program_id": str(program_id),
            "title": self.program_titles[program_id],
            "description": self.program_descriptions[program_id],
            "escrow_token": self.program_escrow_tokens[program_id],
            "arbitration_fee_pct": str(self.program_arbitration_fee_pcts[program_id]),
            "challenge_window_blocks": str(self.program_challenge_window_blocks[program_id]),
            "status": self.program_statuses[program_id],
        }
        return json.dumps(obj, sort_keys=True, separators=(",", ":"))

    @gl.public.view
    def get_program_count(self) -> u256:
        return self.program_count

    @gl.public.view
    def get_program_dispute_count(self, program_id: u256) -> u256:
        if program_id >= self.program_count:
            return u256(0)
        return self.program_dispute_counts[program_id]

    @gl.public.view
    def get_program_dispute(self, program_id: u256, index: u256) -> u256:
        if program_id >= self.program_count:
            return u256(0)
        raw = self.program_dispute_ids[program_id]
        if len(raw) == 0:
            return u256(0)
        ids = [x.strip() for x in raw.split(",") if len(x.strip()) > 0]
        if index >= u256(len(ids)):
            return u256(0)
        return u256(int(ids[int(index)]))

    @gl.public.view
    def get_program_title(self, program_id: u256) -> str:
        if program_id >= self.program_count:
            return ""
        return self.program_titles[program_id]

    @gl.public.view
    def get_program_status(self, program_id: u256) -> str:
        if program_id >= self.program_count:
            return "INVALID"
        return self.program_statuses[program_id]

    @gl.public.write
    def close_program(self, program_id: u256) -> typing.Any:
        if program_id >= self.program_count:
            return "INVALID_PROGRAM_ID"
        if self.program_statuses[program_id] != "ACTIVE":
            return "NOT_ACTIVE"
        self.program_statuses[program_id] = "CLOSED"
        return "CLOSED"

    # ═══════════════════════════════════════════════════════════════════════
    # DISPUTE LIFECYCLE
    # ═══════════════════════════════════════════════════════════════════════

    @gl.public.write
    def create_dispute(
        self,
        program_id: u256,
        plaintiff: str,
        defendant: str,
        contract_text_url: str,
        plaintiff_evidence_urls: str,
        defendant_evidence_urls: str,
        dispute_type: str,
        escrow_amount: u256,
    ) -> typing.Any:
        if program_id >= self.program_count:
            return "INVALID_PROGRAM_ID"
        if self.program_statuses[program_id] != "ACTIVE":
            return "PROGRAM_NOT_ACTIVE"
        if len(plaintiff) == 0 or len(defendant) == 0:
            return "MISSING_PARTY"
        if len(contract_text_url) == 0:
            return "MISSING_CONTRACT_URL"
        if len(dispute_type) == 0:
            return "MISSING_DISPUTE_TYPE"
        if escrow_amount == u256(0):
            return "ZERO_ESCROW"
        allowed_types = ["ECOMMERCE", "FREELANCE", "SLA", "B2B", "OTHER"]
        if dispute_type not in allowed_types:
            return "INVALID_DISPUTE_TYPE"

        dispute_id = self.dispute_count
        self.dispute_program_ids[dispute_id] = program_id
        self.dispute_plaintiffs[dispute_id] = plaintiff
        self.dispute_defendants[dispute_id] = defendant
        self.dispute_contract_text_urls[dispute_id] = contract_text_url
        self.dispute_p_evidence_urls[dispute_id] = plaintiff_evidence_urls
        self.dispute_d_evidence_urls[dispute_id] = defendant_evidence_urls
        self.dispute_types[dispute_id] = dispute_type
        self.dispute_escrow_amounts[dispute_id] = escrow_amount
        self.dispute_statuses[dispute_id] = "PENDING"
        self.dispute_verdicts[dispute_id] = ""
        self.dispute_verdict_confidences[dispute_id] = u256(0)
        self.dispute_created_ats[dispute_id] = u256(0)
        self.dispute_verdict_ats[dispute_id] = u256(0)
        self.dispute_challenge_deadlines[dispute_id] = u256(0)

        idx_str = str(dispute_id)
        existing = self.program_dispute_ids[program_id]
        self.program_dispute_ids[program_id] = (
            existing + "," + idx_str if len(existing) > 0 else idx_str
        )
        self.program_dispute_counts[program_id] = (
            self.program_dispute_counts[program_id] + u256(1)
        )
        self.dispute_count = dispute_id + u256(1)
        return dispute_id

    @gl.public.write
    def submit_evidence(
        self,
        dispute_id: u256,
        party: str,
        evidence_urls: str,
    ) -> typing.Any:
        if dispute_id >= self.dispute_count:
            return "INVALID_DISPUTE_ID"
        status = self.dispute_statuses[dispute_id]
        if status != "PENDING" and status != "EVIDENCE_SUBMITTED":
            return "CANNOT_SUBMIT_EVIDENCE"
        if party == self.dispute_plaintiffs[dispute_id]:
            existing = self.dispute_p_evidence_urls[dispute_id]
            self.dispute_p_evidence_urls[dispute_id] = (
                existing + "," + evidence_urls if len(existing) > 0 else evidence_urls
            )
        elif party == self.dispute_defendants[dispute_id]:
            existing = self.dispute_d_evidence_urls[dispute_id]
            self.dispute_d_evidence_urls[dispute_id] = (
                existing + "," + evidence_urls if len(existing) > 0 else evidence_urls
            )
        else:
            return "NOT_A_PARTY"
        self.dispute_statuses[dispute_id] = "EVIDENCE_SUBMITTED"
        return "EVIDENCE_SUBMITTED"

    @gl.public.view
    def get_dispute(self, dispute_id: u256) -> str:
        if dispute_id >= self.dispute_count:
            return json.dumps({"error": "INVALID_DISPUTE_ID"})
        p_raw = self.dispute_p_evidence_urls[dispute_id]
        d_raw = self.dispute_d_evidence_urls[dispute_id]
        p_urls = json.loads(p_raw) if p_raw else []
        d_urls = json.loads(d_raw) if d_raw else []
        obj = {
            "dispute_id": str(dispute_id),
            "program_id": str(self.dispute_program_ids[dispute_id]),
            "plaintiff": self.dispute_plaintiffs[dispute_id],
            "defendant": self.dispute_defendants[dispute_id],
            "contract_text_url": self.dispute_contract_text_urls[dispute_id],
            "plaintiff_evidence_urls": p_urls,
            "defendant_evidence_urls": d_urls,
            "dispute_type": self.dispute_types[dispute_id],
            "escrow_amount": str(self.dispute_escrow_amounts[dispute_id]),
            "status": self.dispute_statuses[dispute_id],
            "verdict": self.dispute_verdicts[dispute_id],
            "verdict_confidence": str(self.dispute_verdict_confidences[dispute_id]),
            "created_at": str(self.dispute_created_ats[dispute_id]),
            "verdict_at": str(self.dispute_verdict_ats[dispute_id]),
            "challenge_deadline": str(self.dispute_challenge_deadlines[dispute_id]),
        }
        return json.dumps(obj, sort_keys=True, separators=(",", ":"))

    @gl.public.view
    def get_dispute_count(self) -> u256:
        return self.dispute_count

    @gl.public.view
    def get_dispute_status(self, dispute_id: u256) -> str:
        if dispute_id >= self.dispute_count:
            return "INVALID_DISPUTE_ID"
        return self.dispute_statuses[dispute_id]

    # ═══════════════════════════════════════════════════════════════════════
    # AI ARBITRATION (CORE — strict_eq pattern per CLAUDE.md)
    # ═══════════════════════════════════════════════════════════════════════

    @gl.public.write
    def evaluate_dispute(self, dispute_id: u256) -> typing.Any:
        if dispute_id >= self.dispute_count:
            return "INVALID_DISPUTE_ID"
        status = self.dispute_statuses[dispute_id]
        if status == "VERDICT_REACHED":
            return "ALREADY_EVALUATED"
        if status == "EXECUTED":
            return "ALREADY_EXECUTED"
        if status == "CHALLENGED":
            return "UNDER_CHALLENGE"

        contract_url = self.dispute_contract_text_urls[dispute_id]
        p_urls_raw = self.dispute_p_evidence_urls[dispute_id]
        d_urls_raw = self.dispute_d_evidence_urls[dispute_id]
        p_evidence_urls = json.loads(p_urls_raw) if p_urls_raw else []
        d_evidence_urls = json.loads(d_urls_raw) if d_urls_raw else []
        plaintiff = self.dispute_plaintiffs[dispute_id]
        defendant = self.dispute_defendants[dispute_id]
        dispute_type = self.dispute_types[dispute_id]
        escrow_amount = self.dispute_escrow_amounts[dispute_id]
        program_id = self.dispute_program_ids[dispute_id]
        fee_pct = self.program_arbitration_fee_pcts[program_id]
        challenge_blocks = self.program_challenge_window_blocks[program_id]

        def truncate(text, limit):
            if len(text) > limit:
                return text[:limit]
            return text

        def run_evaluation() -> str:
            contract_text = ""
            if len(contract_url) > 0:
                try:
                    resp = gl.nondet.web.get(contract_url)
                    contract_text = resp.body.decode("utf-8")
                except Exception:
                    contract_text = "[FETCH_FAILED:contract_url]"
            contract_text = truncate(contract_text, 4000)

            p_sections = []
            for idx in range(len(p_evidence_urls)):
                url = p_evidence_urls[idx]
                if len(url) > 0:
                    try:
                        r = gl.nondet.web.get(url)
                        body = r.body.decode("utf-8")
                        p_sections.append(
                            "=== Plaintiff Evidence {} ({}) ===\n{}".format(
                                idx + 1, url, truncate(body, 4000)
                            )
                        )
                    except Exception:
                        p_sections.append(
                            "=== Plaintiff Evidence {} ({}) === [FETCH_FAILED]".format(
                                idx + 1, url
                            )
                        )
            p_evidence_block = "\n\n".join(p_sections)

            d_sections = []
            for idx in range(len(d_evidence_urls)):
                url = d_evidence_urls[idx]
                if len(url) > 0:
                    try:
                        r = gl.nondet.web.get(url)
                        body = r.body.decode("utf-8")
                        d_sections.append(
                            "=== Defendant Evidence {} ({}) ===\n{}".format(
                                idx + 1, url, truncate(body, 4000)
                            )
                        )
                    except Exception:
                        d_sections.append(
                            "=== Defendant Evidence {} ({}) === [FETCH_FAILED]".format(
                                idx + 1, url
                            )
                        )
            d_evidence_block = "\n\n".join(d_sections)

            fee_bps_str = str(int(fee_pct * u256(100) // u256(10000)))

            prompt = (
                "You are a professional commercial arbitrator for the FairDeal.ai "
                "platform on GenLayer. Your ruling is executed atomically on-chain. "
                "Be precise, neutral, and evidence-based.\n\n"
                "=== DISPUTE METADATA ===\n"
                "Dispute Type: " + dispute_type + "\n"
                "Escrow Amount: " + str(int(escrow_amount)) + " tokens\n"
                "Arbitration Fee: " + fee_bps_str + " bps (deducted from escrow)\n"
                "Challenge Window: " + str(int(challenge_blocks)) + " blocks (~7 days)\n"
                "Plaintiff: " + plaintiff + "\n"
                "Defendant: " + defendant + "\n\n"
                "=== CONTRACT / AGREEMENT TEXT (" + contract_url + ") ===\n"
                + contract_text + "\n\n"
                "=== PLAINTIFF EVIDENCE ===\n" + p_evidence_block + "\n\n"
                "=== DEFENDANT EVIDENCE ===\n" + d_evidence_block + "\n\n"
                "=== ARBITRATION INSTRUCTIONS ===\n"
                "Apply commercial-law standards and industry norms for the dispute type.\n"
                "E-COMMERCE: goods as described, fit for purpose, delivered as agreed.\n"
                "FREELANCE: deliverables match agreed scope, quality, and timeline.\n"
                "SLA: service levels met; downtime/breach windows apply.\n"
                "B2B: contract terms govern; delivery confirmations matter.\n"
                "OTHER: general contract-law fairness principles.\n\n"
                "=== OUTPUT FORMAT ===\n"
                "Respond with ONLY this JSON, no other text or explanation:\n"
                '{"breach_by":"PLAINTIFF|DEFENDANT|BOTH|NEITHER",\n'
                ' "severity":"MINOR|MATERIAL|FUNDAMENTAL",\n'
                ' "remedy":"FULL_REFUND|PARTIAL_REFUND|RELEASE_TO_DEFENDANT|PENALTY_DAMAGES",\n'
                ' "refund_percentage":<0-100 integer>,\n'
                ' "reasoning":"<1-3 sentence explanation>",\n'
                ' "confidence":<1-10 integer>,\n'
                ' "violated_terms":["<clause reference or empty list>"],\n'
                ' "evidence_strength":{"plaintiff":"STRONG|MODERATE|WEAK","defendant":"STRONG|MODERATE|WEAK"}}\n\n'
                "Respond with ONLY this JSON, no other text or explanation."
            )
            return gl.nondet.exec_prompt(prompt)

        evaluation_json = gl.eq_principle.strict_eq(run_evaluation)

        try:
            cleaned = (
                evaluation_json.replace("```json", "").replace("```", "").strip()
            )
            data = json.loads(cleaned)
        except Exception:
            return "PARSE_ERROR:" + evaluation_json[:200]

        self.dispute_verdicts[dispute_id] = json.dumps(
            data, sort_keys=True, separators=(",", ":")
        )
        self.dispute_verdict_confidences[dispute_id] = u256(
            int(data.get("confidence", 0))
        )
        self.dispute_verdict_ats[dispute_id] = u256(0)
        self.dispute_challenge_deadlines[dispute_id] = u256(0) + challenge_blocks
        self.dispute_statuses[dispute_id] = "VERDICT_REACHED"
        return self.dispute_verdicts[dispute_id]

    # ═══════════════════════════════════════════════════════════════════════
    # VERDICT EXECUTION (no division — uses // only)
    # ═══════════════════════════════════════════════════════════════════════

    @gl.public.write
    def execute_verdict(self, dispute_id: u256) -> typing.Any:
        if dispute_id >= self.dispute_count:
            return "INVALID_DISPUTE_ID"
        status = self.dispute_statuses[dispute_id]
        if status != "VERDICT_REACHED":
            return "NO_VERDICT"
        if self.dispute_challenge_deadlines[dispute_id] != u256(0):
            return "CHALLENGE_PENDING"

        verdict_raw = self.dispute_verdicts[dispute_id]
        try:
            verdict = json.loads(verdict_raw)
        except Exception:
            return "INVALID_VERDICT_JSON"

        remedy = str(verdict.get("remedy", ""))
        refund_pct_raw = verdict.get("refund_percentage", 0)
        refund_pct = u256(int(refund_pct_raw))
        escrow_amount = self.dispute_escrow_amounts[dispute_id]
        fee_bps = self.program_arbitration_fee_pcts[
            self.dispute_program_ids[dispute_id]
        ]
        fee = escrow_amount * fee_bps // u256(10000)
        net = escrow_amount - fee
        plaintiff = self.dispute_plaintiffs[dispute_id]
        defendant = self.dispute_defendants[dispute_id]

        if remedy == "FULL_REFUND":
            to_plaintiff = net
            to_defendant = u256(0)
        elif remedy == "PARTIAL_REFUND":
            to_plaintiff = net * refund_pct // u256(100)
            to_defendant = net - to_plaintiff
        elif remedy == "RELEASE_TO_DEFENDANT":
            to_plaintiff = u256(0)
            to_defendant = net
        elif remedy == "PENALTY_DAMAGES":
            penalty = net * refund_pct // u256(100)
            to_plaintiff = net - penalty
            to_defendant = penalty
        else:
            return "UNKNOWN_REMEDY"

        dispute_id_val = dispute_id
        ts = u256(0)

        if int(to_plaintiff) > 0:
            self.treasury_recipients.append(plaintiff)
            self.treasury_amounts.append(to_plaintiff)
            self.treasury_dispute_ids.append(dispute_id_val)
            self.treasury_timestamps.append(ts)
            self.treasury_count = self.treasury_count + u256(1)

        if int(to_defendant) > 0:
            self.treasury_recipients.append(defendant)
            self.treasury_amounts.append(to_defendant)
            self.treasury_dispute_ids.append(dispute_id_val)
            self.treasury_timestamps.append(ts)
            self.treasury_count = self.treasury_count + u256(1)

        self.dispute_statuses[dispute_id] = "EXECUTED"

        result = {
            "dispute_id": int(dispute_id),
            "remedy": remedy,
            "refund_percentage": int(refund_pct),
            "to_plaintiff": int(to_plaintiff),
            "to_defendant": int(to_defendant),
            "arbitration_fee": int(fee),
        }
        return json.dumps(result, sort_keys=True, separators=(",", ":"))

    # ═══════════════════════════════════════════════════════════════════════
    # CHALLENGE MECHANISM
    # ═══════════════════════════════════════════════════════════════════════

    @gl.public.write
    def challenge_verdict(self, dispute_id: u256, reason: str) -> typing.Any:
        if dispute_id >= self.dispute_count:
            return "INVALID_DISPUTE_ID"
        status = self.dispute_statuses[dispute_id]
        if status != "VERDICT_REACHED":
            return "NOT_CHALLENGEABLE"
        if len(reason) == 0:
            return "EMPTY_REASON"
        self.dispute_statuses[dispute_id] = "CHALLENGED"
        return "CHALLENGE_REGISTERED"

    @gl.public.view
    def get_challenge_status(self, dispute_id: u256) -> str:
        if dispute_id >= self.dispute_count:
            return json.dumps({"error": "INVALID_DISPUTE_ID"})
        obj = {
            "dispute_id": str(dispute_id),
            "status": self.dispute_statuses[dispute_id],
            "challenge_deadline": str(self.dispute_challenge_deadlines[dispute_id]),
        }
        return json.dumps(obj, sort_keys=True, separators=(",", ":"))

    # ═══════════════════════════════════════════════════════════════════════
    # QUERY FUNCTIONS
    # ═══════════════════════════════════════════════════════════════════════

    @gl.public.view
    def get_treasury_count(self) -> u256:
        return self.treasury_count

    @gl.public.view
    def get_treasury_record(self, index: u256) -> str:
        if index >= self.treasury_count:
            return json.dumps({"error": "INVALID_INDEX"})
        obj = {
            "index": str(index),
            "recipient": self.treasury_recipients[index],
            "amount": str(self.treasury_amounts[index]),
            "dispute_id": str(self.treasury_dispute_ids[index]),
            "timestamp": str(self.treasury_timestamps[index]),
        }
        return json.dumps(obj, sort_keys=True, separators=(",", ":"))
