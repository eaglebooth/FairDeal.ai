# FairDeal.ai - Build Prompt cho Claude Code
# Copy toàn bộ nội dung này và paste vào Claude Code để build toàn bộ dự án

Build a complete landing page for "FairDeal.ai" — an AI-powered autonomous arbitration platform for e-commerce & freelance disputes, built on GenLayer blockchain.

## DESIGN REFERENCE
Mô phỏng UI/UX theo https://cryonix.framer.website với các quy tắc sau:

### Màu sắc (Color Palette)
- Background chính: #0a0a0f (gần đen, đậm hơn Cryonix)
- Background section phụ: #0f0f18
- Primary accent: #3b82f6 (electric blue, giống Cryonix)
- Secondary accent: #8b5cf6 (purple, cho gradient)
- Gradient hero: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)
- Text chính: #ffffff
- Text phụ: #9ca3af (gray-400)
- Border: rgba(255, 255, 255, 0.08)
- Card background: rgba(255, 255, 255, 0.03)
- Card hover: rgba(255, 255, 255, 0.06)
- Success green: #10b981 (cho verdict RELEASE)
- Warning red: #ef4444 (cho verdict REFUND)

### Typography
- Font chính: Inter (Google Fonts)
- Headline: font-weight 700, letter-spacing -0.02em
- Subheadline: font-weight 500, letter-spacing -0.01em
- Body: font-weight 400, line-height 1.6
- Mono (cho stats): font-family 'JetBrains Mono' hoặc Inter

### Layout & Spacing
- Max content width: 1280px, centered
- Section padding: 120px top/bottom
- Grid gap: 24px
- Card border-radius: 16px
- Button border-radius: 12px
- Nav height: 72px

### Hiệu ứng (Effects)
- Glassmorphism nhẹ trên cards: backdrop-blur(12px) + background: rgba(255,255,255,0.03)
- Hover cards: translateY(-4px) + shadow-lg
- Gradient text cho headline chính: background-clip: text
- Smooth scroll behavior
- Fade-in animation khi scroll (dùng Intersection Observer)

---

## SECTIONS CẦN BUILD (theo đúng thứ tự)

### 1. Navigation Bar (Fixed, Sticky)
- Logo "FairDeal.ai" bên trái (gradient text)
- Nav links: How It Works, Features, Use Cases, Stats, FAQ, Contact
- CTA button "Launch App" bên phải (primary gradient)
- Mobile: hamburger menu
- Blur backdrop khi scroll

### 2. Hero Section (Full viewport height - 100vh)
**Background:**
- Deep dark (#0a0a0f)
- Subtle grid pattern overlay (như Cryonix)
- Floating glow orbs (blue/purple) với blur 100px, absolute positioned
- Maybe subtle noise texture

**Content:**
- Badge "⚡ Powered by GenLayer Blockchain" nhỏ, outlined, phía trên
- Headline: "Autonomous AI Arbitration" (line 1)
- Headline: "On Every Dispute." (line 2, gradient text)
- Subheadline: "Smart contracts that read the internet, analyze evidence with AI, and automatically resolve disputes — no lawyers, no middlemen, no waiting 30 days for a chargeback."
- Two CTA buttons: "Start Resolving" (primary gradient) + "Read Docs" (secondary outlined)
- Below buttons: "Trusted by GenLayer validators" với số liệu: "50+ AI Validators | Sub-second Consensus | Immutable Verdicts"
- Phía dưới hero: Mockup UI preview — hình ảnh/pseudo-UI của một dispute resolution interface (card với status "VERDICT: RELEASE", progress bar, evidence URLs)

### 3. Stats Section (Horizontal bar, dark background)
- 4 cột: 
  - "99.7%" - Consensus Accuracy
  - "< 30s" - Average Resolution Time
  - "$0" - No Middleman Fees
  - "100%" - On-Chain Immutable

### 4. How It Works Section (3 Steps)
- Section label: "HOW IT WORKS" nhỏ, outlined badge
- Headline: "From Dispute to Verdict in 3 Steps"
- 3 bước với số thứ tự lớn (01, 02, 03):
  1. **Submit Dispute** — "Lock funds in smart escrow. Upload contract text, communication logs, and evidence URLs. Both parties agree to AI arbitration."
  2. **AI Analysis** — "GenLayer validators fetch all evidence via web.get(). AI reads contracts, analyzes evidence, applies commercial law standards, and reaches consensus verdict."
  3. **Auto-Execute** — "Smart contract automatically releases funds per verdict. No appeals to human courts. No waiting. The blockchain enforces the outcome."
- Mỗi bước có icon, title, description, và optional technical note nhỏ (monospace font)
- Connector line giữa 3 bước (vertical hoặc horizontal depending on breakpoint)

### 5. Features Section (Grid 2x3 hoặc 3x2)
- Section label: "FEATURES"
- Headline: "Built for the Post-Trust Era"
- 6 feature cards:
  1. **🌐 Native Web Access** — "AI jurors read any URL directly on-chain. No oracles, no off-chain relays. Evidence fetched from the blockchain itself."
  2. **🧠 Subjective AI Reasoning** — "LLM-powered analysis understands context, nuance, and commercial intent. Not just binary code — actual reasoning."
  3. **⚡ Optimistic Democracy** — "Multiple AI validators reach byte-identical consensus via strict equivalence. Slashing prevents collusion."
  4. **🔒 Non-Custodial Escrow** — "Funds locked in smart contract, not controlled by any party. Atomic execution guarantees outcome enforcement."
  5. **🚫 Zero Bias Mediation** — "No human arbitrator with conflicts of interest. No platform taking sides to retain customers. Pure algorithmic neutrality."
  6. **🔁 Challengeable Verdicts** — "7-day challenge window. Disputed verdicts trigger multi-panel AI re-evaluation. Quality assurance built in."

- Mỗi card: icon emoji, title (font-weight 600), description, subtle gradient border on hover

### 6. Use Cases Section (Timeline/Cards)
- Section label: "USE CASES"
- Headline: "Any Dispute, Any Contract, Anywhere"
- 4 use case cards lớn:
  1. **E-Commerce Disputes** — "Buyer claims 'item not as described'. AI reads product listing, delivery proof, communication. Verdict in seconds."
  2. **Freelance Contract Breach** — "Client vs freelancer over scope, quality, or delivery. AI reads project brief, submitted work URL, git history."
  3. **SaaS SLA Violations** — "Downtime disputes, feature delivery misses. AI reads SLA terms, monitoring data, support tickets."
  4. **B2B Invoice Disputes** — "Payment disputes between businesses. AI reads contracts, invoices, delivery confirmations, correspondence."

- Mỗi use case: icon, title, scenario description, example verdict display (như một code snippet nhỏ)

### 7. Technical Architecture Section (Dark, code-like aesthetic)
- Section label: "UNDER THE HOOD"
- Headline: "Powered by GenLayer's Intelligent Contracts"
- 2 cột layout:
  - **Bên trái:** Mô tả text về GenLayer architecture
  - **Bên phải:** Code snippet display (mockup) — hiển thị phần code giống GenGrant.py pattern:
    ```python
    @gl.public.write
    def arbitrate_dispute(self, contract_url, evidence_urls):
        def evaluate() -> str:
            # Fetch evidence from URLs
            contract = gl.nondet.web.get(contract_url)
            evidence = [gl.nondet.web.get(u) for u in evidence_urls]
            
            # AI analysis
            prompt = build_arbitration_prompt(contract, evidence)
            return gl.nondet.exec_prompt(prompt)
        
        # Consensus: all validators must agree
        verdict = gl.eq_principle.strict_eq(evaluate)
        return json.loads(verdict)
    ```
  - Styling: dark code block, syntax highlighting màu sắc (giữ giống IDE), border-radius, subtle border
- Dưới code: 3 tech badges: "GenVM Runtime" | "Python Contracts" | "AI Validator Network"

### 8. Comparison Section (Table hoặc VS cards)
- Section label: "VS TRADITIONAL DISPUTE RESOLUTION"
- Headline: "Why FairDeal.ai Changes Everything"
- Comparison table với 2 cột: "Traditional" vs "FairDeal.ai"
  - Resolution Time: 30-60 days vs < 30 seconds
  - Cost: 15-30% of dispute value vs 1-3%
  - Neutrality: Platform-biased vs Algorithmically neutral
  - Evidence: Paper-based submissions vs Native web evidence fetching
  - Enforcement: Court order needed vs Atomic smart contract execution
  - Appeal: Human court system vs Multi-panel AI re-evaluation
  - Transparency: Opaque process vs Fully on-chain, auditable

### 9. CTA Section (Hero-style, gradient background)
- Full-width gradient section (#3b82f6 → #8b5cf6)
- Headline lớn: "Ready to Resolve Disputes Fairly?"
- Subtext: "Join the waitlist for early access to FairDeal.ai on GenLayer testnet."
- Input email + button "Join Waitlist" (dark button trên gradient background)
- Phía dưới: "No spam. Only product updates. Unsubscribe anytime."

### 10. FAQ Section (Accordion)
- Section label: "FAQ"
- Headline: "Common Questions"
- 5-6 questions dạng accordion:
  1. "How does FairDeal.ai differ from PayPal/eBay dispute resolution?" — Trả lời: AI không bị thiên vị, evidence được fetch trực tiếp từ URL, verdict tự động thực thi không cần human approval, chi phí thấp hơn nhiều.
  2. "Can AI really make fair arbitration decisions?" — Trả lời: GenLayer sử dụng Optimistic Democracy — nhiều validators khác nhau phải đưa ra cùng kết quả. Nếu không đồng thuận → appeal process. Consensus mechanism đảm bảo fairness.
  3. "What types of disputes can FairDeal.ai handle?" — Trả lời: E-commerce, freelance, SaaS SLA, B2B contracts, invoice disputes — bất kỳ dispute nào có bằng chứng dạng text/URL.
  4. "Is the arbitration legally binding?" — Trả lời: Kết quả được ghi trên blockchain, không thể sửa đổi. Các hợp đồng có thể specify rằng FairDeal.ai verdict là binding. Luật hiện đại đang công nhận smart contract arbitration.
  5. "What if I disagree with the AI verdict?" — Trả lời: 7-day challenge window. Khi challenge → 3 AI arbiters độc lập re-evaluate. Majority wins. Process này đảm bảo quality.
  6. "How much does it cost?" — Trả lời: 1-3% trên giá trị tranh chấp, thấp hơn nhiều so với chargeback fees (15-30%) và luật sư.

### 11. Footer
- Logo "FairDeal.ai" (gradient) + tagline nhỏ
- 3 cột links:
  - Product: How It Works, Features, Use Cases, Pricing
  - Developers: Documentation, GenLayer Docs, GitHub, Testnet
  - Legal: Terms of Service, Privacy Policy, Arbitration Policy
- Bottom bar: "© 2025 FairDeal.ai — Built on GenLayer. Powered by AI."
- Social links (placeholder): Twitter/X, Discord, GitHub
- Nền: slightly lighter than main background (#0f0f18)

---

## TECH STACK
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS (v3.4+)
- **Animations:** Framer Motion
- **Fonts:** Inter + JetBrains Mono (Google Fonts)
- **Icons:** Lucide React hoặc emoji-based như thiết kế Cryonix
- **Deploy target:** Vercel-ready

## IMPLEMENTATION NOTES
1. File structure Next.js chuẩn: app/ directory
2. Tạo reusable components: Navbar, Footer, Section, FeatureCard, StatCard
3. Responsive: mobile-first, breakpoints sm/md/lg/xl
4. Dark mode ONLY — không cần light mode toggle (giống Cryonix)
5. Performance: Next.js Image optimization, font optimization
6. SEO: meta tags cho FairDeal.ai
7. Animations: subtle, professional — KHÔNG quá nhiều animation làm chậm
8. Không cần backend API — static landing page
9. Email input trong CTA section có thể là form HTML đơn giản (không cần submit logic thật)
10. Mockup UI trong hero section có thể là một SVG illustration hoặc styled div

## SUCCESS CRITERIA
- Trông giương và cảm nhận giống Cryonix (dark SaaS, glassmorphism, gradient accents)
- Responsive tốt trên mobile/tablet/desktop
- Scroll smooth, animations mượt
- Typography rõ ràng, hierarchy rõ ràng
- CTA buttons nổi bật
- Code block section trông như IDE thật (dark theme, syntax highlighting)
- Accordion FAQ hoạt động với click
- Tất cả nội dung tiếng Anh chuyên nghiệp, persuasive copywriting

Build this as a production-ready landing page. Tạo full file structure, đầy đủ components, styling, animations, và responsive design.
