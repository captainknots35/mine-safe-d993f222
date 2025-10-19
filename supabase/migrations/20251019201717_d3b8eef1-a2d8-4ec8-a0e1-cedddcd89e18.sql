-- Update Lesson 1: Introduction with full verbatim content from PDF
UPDATE lessons
SET content_data = jsonb_set(
  content_data,
  '{content}',
  to_jsonb('# Introduction: Why This Module Matters

## The Unforgiving Environment & The Professional''s Mindset

This training module is the **most critical component** of a miner''s safety education. It is not about memorizing regulations for compliance; it is about **internalizing procedures for survival**. The actions and protocols detailed in this curriculum are not theoretical. They are the direct result of hard-learned lessons from real incidents, investigations, and the collective experience of the mining industry. In the dynamic and powerful environment of a surface mine, where conditions can change in an instant, emergencies are not a matter of **if**, but **when**. Mastering this material is a core professional responsibility. The objective is to move beyond simply knowing *what* to do in an emergency and to understand *why* it is done. This deeper comprehension ensures that when an incident occurs and seconds count, training and instinct take over, leading to calm, decisive, and life-saving actions. The defining characteristic of a professional miner is an unwavering commitment to their own safety and the safety of their crew, a commitment that is forged through the mastery of the knowledge contained within this module.

---

## The Foundation of Law: From Tragedy to Regulation

The federal safety regulations that govern the mining industry are not arbitrary rules created in an office. They are a **living history** of the industry''s most painful lessons, often written in response to catastrophic events. Understanding this history is essential to appreciating the profound importance of every procedure in this module.

### Modern Era of Mine Safety

The modern era of mine safety began with the **Federal Mine Safety and Health Act of 1977**. Before this landmark legislation, the mining industry was plagued by an appalling number of fatalities. In the early 20th century, it was common for thousands of miners to die each year; the single deadliest year in U.S. coal mining history was 1907, when an estimated **3,242 deaths** occurred. That same year, the nation''s worst-ever mine disaster at Monongah, West Virginia, killed **362 men and boys**, an event that spurred Congress to create the U.S. Bureau of Mines. Despite incremental progress, a comprehensive federal framework was lacking. Following the Farmington Mine Disaster of 1968, Congress passed the Federal Coal Mine Health and Safety Act of 1969, which mandated inspections and gave enforcement power to the Department of the Interior.

### Transformation of the Industry

However, it was the **Federal Mine Safety and Health Act of 1977** that truly transformed the industry. This Act consolidated all coal, metal, and non-metal mining operations under a single, comprehensive legal structure. It transferred enforcement from the Department of the Interior to the Department of Labor, creating the **Mine Safety and Health Administration (MSHA)** to ensure that the focus of regulatory oversight remained squarely on worker safety. The 1977 Act mandated four annual inspections for all underground mines and two annual inspections for all surface mines, established mandatory miner training programs, required mine rescue teams for all underground operations, and greatly expanded the rights of miners and their representatives.

### Impact of the 1977 Mine Act

The impact of the 1977 Mine Act was immediate and profound. Statistical analysis shows that in the decade before the Act was passed (1967-1976), there was an average of **356 mine fatalities per year**. In the decade after the Act was implemented (1978-1987), that number dropped by **53% to an average of 189 fatalities per year**. In 1978, the first year of MSHA''s operation, 242 miners died in accidents; by 2023, that number had fallen to **41**, even as the industry remained a vital part of the nation''s economy. This dramatic reduction in fatalities is tangible proof that the regulations and the culture of safety they foster are effective.

### Evolution of the Law

The law continues to evolve in response to tragedy. In 2006, after the Sago, Aracoma, and Darby mine disasters claimed 19 lives, Congress passed the **Mine Improvement and New Emergency Response (MiNER) Act**. This legislation was the most significant update to mine safety law in nearly 30 years and was specifically designed to modernize emergency preparedness. The MiNER Act required operators to develop detailed, mine-specific emergency response plans, improve post-accident communication and tracking technology, ensure the availability of breathable air and refuge alternatives for trapped miners, and enhance the training and readiness of mine rescue teams. Each provision of the MiNER Act can be traced directly to the challenges faced by miners and rescuers during the 2006 tragedies, demonstrating that the law is a living document, continually updated to prevent the recurrence of past failures.

---

## Your Role and Responsibilities under 30 CFR Part 46

The content herein is **mandated by the Federal Mine Safety and Health Act of 1977** and specified under Title 30, Code of Federal Regulations (30 CFR). This federal law requires that all miners be trained and retrained to perform their jobs in a safe and healthful manner, with the ultimate goal of reducing the frequency and severity of injuries and fatalities in the nation''s mines. This training is required for every person defined as a "miner" working at shell dredging, sand, gravel, surface stone, surface clay, colloidal phosphate, surface limestone, and other specified non-metal surface mining operations.

Under Part 46, the mine operator is responsible for developing and implementing a comprehensive training plan and ensuring this training is provided to all miners, including employees of independent contractors. Furthermore, the training must be presented by a **"competent person"**—an individual designated by the operator who has the ability, training knowledge, or experience to effectively communicate the subject matter. This module forms an essential part of that mandated training plan. Your responsibility as a miner is to actively engage with this material, ask questions, and internalize these procedures until they become second nature. **Your life, and the lives of your coworkers, depend on it.**'::text)
)
WHERE title ILIKE '%introduction%' 
AND module_id IN (SELECT id FROM modules WHERE title ILIKE '%emergency%');

-- Note: Continue with remaining lessons in subsequent migration calls due to size limits