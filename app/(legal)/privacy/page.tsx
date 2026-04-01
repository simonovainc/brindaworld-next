export default function PrivacyPolicy() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: April 1, 2026</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction and Data Controller</h2>
        <p className="text-gray-700 mb-4">
          Simonova Inc. (the "Company," "we," "us," or "our") is committed to protecting your privacy and the privacy of children who use BrindaWorld. This Privacy Policy explains how we collect, use, disclose, retain, and protect your information and the information of the children for whom you manage accounts on BrindaWorld (the "Service").
        </p>
        <p className="text-gray-700 mb-4">
          Simonova Inc. is the data controller responsible for your personal information and the personal information of children using BrindaWorld. Our principal office is located in Fredericton, New Brunswick, Canada.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.1 Information Collected from Parents and Guardians</h3>
        <p className="text-gray-700 mb-4">
          When you create a parent or guardian account, we collect the following information:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Full name</strong> - Used to identify the account holder and for communication purposes</li>
          <li><strong>Email address</strong> - Used for account authentication, password recovery, and service notifications</li>
          <li><strong>Country of residence</strong> - Used to ensure compliance with local laws and regulations</li>
        </ul>
        <p className="text-gray-700 mb-4">
          We do not require parents to provide sensitive information such as home address, phone number, or payment information (when using free tier). When making payments, payment information is processed directly by Stripe and is not stored on our servers.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.2 Information Collected from Children</h3>
        <p className="text-gray-700 mb-4">
          For children using BrindaWorld, we practice data minimization and collect only essential information necessary to provide educational services. Information collected includes:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>First name only</strong> - Used to personalize the learning experience</li>
          <li><strong>Age</strong> - Used to ensure age-appropriate content delivery</li>
          <li><strong>Avatar or profile picture</strong> - Optional; chosen by the child or parent for personalization</li>
          <li><strong>Learning progress and activity data</strong> - Used to track educational advancement and provide personalized recommendations</li>
        </ul>
        <p className="text-gray-700 mb-4">
          We do NOT collect the child's last name, date of birth, home address, phone number, or any other personally identifiable information beyond what is listed above.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.3 Anonymous and Session Data</h3>
        <p className="text-gray-700 mb-4">
          BrindaWorld offers anonymous session access that allows visitors to explore educational content without providing any personal information or creating an account. Anonymous sessions do not involve the collection of any personally identifiable information (PII). We may collect technical data (such as IP address, browser type, and pages visited) for security and service improvement purposes only, and this data is not linked to any individual.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.4 Technical Information</h3>
        <p className="text-gray-700 mb-4">
          We automatically collect certain technical information when you access the Service:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Browser type and version</li>
          <li>IP address (not linked to personal identity in anonymous sessions)</li>
          <li>Device type and operating system</li>
          <li>Pages visited and time spent on each page</li>
          <li>Referrer information</li>
          <li>Session duration and activity timestamps</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">
          We use the information we collect for the following purposes:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Service Delivery:</strong> To create and maintain your account, provide educational content, track learning progress, and personalize the learning experience</li>
          <li><strong>Communication:</strong> To send account notifications, password recovery emails, and important updates about the Service</li>
          <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations, including COPPA, PIPEDA, and GDPR</li>
          <li><strong>Service Improvement:</strong> To analyze usage patterns and improve our educational content and platform features</li>
          <li><strong>Security:</strong> To protect against fraud, unauthorized access, and other security threats</li>
          <li><strong>Payment Processing:</strong> To process subscription payments and billing inquiries through Stripe</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Legal Basis for Data Processing</h2>
        <p className="text-gray-700 mb-4">
          Under applicable data protection laws, we process your information on the following legal bases:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Consent:</strong> For processing children's information under COPPA, PIPEDA, and GDPR, we rely on verifiable parental consent</li>
          <li><strong>Performance of Contract:</strong> To perform our obligations under the Terms of Service and provide the Service</li>
          <li><strong>Legitimate Interest:</strong> To improve our Service, prevent fraud, and ensure security</li>
          <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. COPPA Compliance (Children's Online Privacy Protection Act)</h2>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.1 Verifiable Parental Consent</h3>
        <p className="text-gray-700 mb-4">
          BrindaWorld complies with the Children's Online Privacy Protection Act (COPPA), which applies to websites and online services directed to children under 13. For children under 13, we obtain verifiable parental consent before collecting, using, or disclosing any personal information. Parental consent is verified through email confirmation and account activation by the parent or guardian.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.2 Data Minimization</h3>
        <p className="text-gray-700 mb-4">
          We collect only the minimum personal information necessary to provide educational services to children. We do not collect more information than is reasonably necessary for the stated purpose.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.3 No Behavioral Advertising</h3>
        <p className="text-gray-700 mb-4">
          We do NOT engage in behavioral advertising, targeted advertising, or any form of data-driven marketing to children. We do not build profiles of children's interests, preferences, or behaviors for advertising purposes. Any advertising content displayed to children (if applicable) is generic and not based on personal data.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.4 No Third-Party Sharing</h3>
        <p className="text-gray-700 mb-4">
          We do not share or disclose children's personal information with third parties except as necessary to provide the Service (such as with Supabase for data storage and security) or as required by law. We do not sell, license, or trade children's personal information under any circumstances.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.5 Parental Rights</h3>
        <p className="text-gray-700 mb-4">
          Parents have the right to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Request a detailed review of what personal information has been collected about their child</li>
          <li>Refuse further collection or use of a child's personal information</li>
          <li>Request the deletion of their child's personal information from our systems</li>
          <li>Contact our Children's Privacy Officer with questions or concerns</li>
        </ul>
        <p className="text-gray-700 mb-4">
          To exercise these rights, parents may contact us at <a href="mailto:privacy@brindaworld.ca" className="text-purple-700 hover:text-purple-800 underline">privacy@brindaworld.ca</a> with verification of their relationship to the child.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. PIPEDA Compliance (Personal Information Protection and Electronic Documents Act)</h2>
        <p className="text-gray-700 mb-4">
          As a Canadian company, BrindaWorld complies with the Personal Information Protection and Electronic Documents Act (PIPEDA), which governs the collection, use, and disclosure of personal information in Canada. We adhere to the following PIPEDA principles:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Accountability:</strong> We are responsible for all personal information in our custody and control</li>
          <li><strong>Identifying Purpose:</strong> We identify the purposes for collecting personal information before or at the time of collection</li>
          <li><strong>Consent:</strong> We obtain meaningful consent before collecting, using, or disclosing personal information</li>
          <li><strong>Limiting Collection:</strong> We collect only information necessary for identified purposes</li>
          <li><strong>Limiting Use, Disclosure, and Retention:</strong> We use personal information only for stated purposes and retain it only as long as necessary</li>
          <li><strong>Accuracy:</strong> We ensure personal information is accurate, complete, and up-to-date</li>
          <li><strong>Safeguarding:</strong> We protect personal information with appropriate security measures</li>
          <li><strong>Openness:</strong> We are transparent about our privacy practices and make policies accessible</li>
          <li><strong>Individual Access:</strong> Individuals have the right to access and request correction of their personal information</li>
          <li><strong>Challenging Compliance:</strong> Individuals may challenge our compliance with PIPEDA principles</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. GDPR Compliance (General Data Protection Regulation)</h2>
        <p className="text-gray-700 mb-4">
          For residents of the European Union, European Economic Area, and United Kingdom, BrindaWorld complies with the General Data Protection Regulation (GDPR). We provide the following rights and protections:
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.1 Right of Access</h3>
        <p className="text-gray-700 mb-4">
          You have the right to request access to the personal information we hold about you or your child. We will provide a copy of your data in a structured, commonly-used, and machine-readable format within 30 days of your request.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.2 Right to Rectification</h3>
        <p className="text-gray-700 mb-4">
          You have the right to request that we correct inaccurate or incomplete personal information. You may update your account information directly through the Service, or contact us for assistance.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.3 Right to Erasure (Right to be Forgotten)</h3>
        <p className="text-gray-700 mb-4">
          You have the right to request the deletion of your personal information, subject to certain exceptions (such as when we have a legal obligation to retain the data). Upon receiving a valid deletion request, we will delete your information within 30 days unless legal requirements require longer retention.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.4 Right to Restrict Processing</h3>
        <p className="text-gray-700 mb-4">
          You may request that we restrict our processing of your personal information in certain circumstances, such as while we verify the accuracy of disputed data.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.5 Right to Data Portability</h3>
        <p className="text-gray-700 mb-4">
          You have the right to receive your personal information in a structured, commonly-used, machine-readable format and to transmit it to another service provider without hindrance.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.6 Right to Object</h3>
        <p className="text-gray-700 mb-4">
          You may object to our processing of your personal information based on legitimate interests. We will cease processing unless we have compelling legitimate interests that override yours.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.7 Rights Related to Automated Decision Making</h3>
        <p className="text-gray-700 mb-4">
          You have the right not to be subject to decisions based solely on automated processing that has legal or significant effects. BrindaWorld does not make such decisions regarding users.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Data Retention</h2>
        <p className="text-gray-700 mb-4">
          We retain personal information only for as long as necessary to provide the Service and fulfill the purposes described in this Privacy Policy:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Active Accounts:</strong> While your account is active, we retain all associated personal information</li>
          <li><strong>Account Deletion:</strong> When you request account deletion or your subscription expires, we retain information for 30 days to allow account recovery or address final billing matters</li>
          <li><strong>Legal Obligations:</strong> If we have a legal obligation to retain certain information (such as for tax purposes), we retain it for the required period</li>
          <li><strong>Learning Data:</strong> Educational progress and activity data is retained as long as the account is active and for 30 days thereafter</li>
          <li><strong>Technical Logs:</strong> Server logs and technical data are retained for 90 days for security and troubleshooting purposes</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Data Security and Encryption</h2>
        <p className="text-gray-700 mb-4">
          We implement comprehensive technical and organizational security measures to protect personal information from unauthorized access, alteration, disclosure, or destruction:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Encryption in Transit:</strong> All data transmitted between your device and our servers is encrypted using TLS 1.2 or higher</li>
          <li><strong>Encryption at Rest:</strong> Personal information is encrypted when stored in our database using AES-256 encryption</li>
          <li><strong>Row-Level Security (RLS):</strong> Our Supabase database implements row-level security policies to ensure users can access only their own data</li>
          <li><strong>Access Controls:</strong> We restrict access to personal information to authorized employees and contractors who need such access to perform their duties</li>
          <li><strong>Authentication:</strong> We use secure authentication mechanisms including password hashing and OAuth-based authentication through Supabase Auth</li>
          <li><strong>Regular Security Audits:</strong> We conduct regular security assessments and penetration testing</li>
          <li><strong>Incident Response:</strong> We have a documented incident response plan to address any data breaches or security incidents</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Third-Party Services and Data Processors</h2>
        <p className="text-gray-700 mb-4">
          BrindaWorld uses the following third-party services to deliver and improve the Service. All third parties are contractually obligated to protect personal information:
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.1 Supabase (Database and Authentication)</h3>
        <p className="text-gray-700 mb-4">
          We use Supabase for secure cloud database storage, authentication, and real-time data synchronization. Supabase implements industry-standard security practices and is SOC 2 certified. Personal information is encrypted and protected by row-level security policies.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.2 Stripe (Payment Processing)</h3>
        <p className="text-gray-700 mb-4">
          Payment information is processed exclusively by Stripe, a PCI DSS Level 1 certified payment processor. We do not store credit card information on our servers. Stripe's privacy practices are governed by their Privacy Policy, which can be reviewed at stripe.com.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.3 Vercel (Hosting and Deployment)</h3>
        <p className="text-gray-700 mb-4">
          The BrindaWorld website and application are hosted on Vercel's servers. Vercel implements enterprise-grade security and is SOC 2 compliant. Technical data may be processed by Vercel for monitoring and optimization purposes.
        </p>

        <p className="text-gray-700 mb-4">
          We have Data Processing Agreements (DPAs) in place with all data processors to ensure compliance with GDPR, PIPEDA, and COPPA requirements.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. International Data Transfers</h2>
        <p className="text-gray-700 mb-4">
          Your personal information may be transferred to, stored in, and processed in Canada and the United States. These countries may have data protection laws that differ from your jurisdiction. By using BrindaWorld, you consent to the transfer of your information to countries outside your country of residence, which may not have the same data protection laws. We implement Standard Contractual Clauses (SCCs) to protect international transfers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Cookies and Tracking Technologies</h2>
        <p className="text-gray-700 mb-4">
          We use cookies and similar tracking technologies to enhance your experience and improve the Service. For detailed information about our use of cookies, please review our <a href="/cookies" className="text-purple-700 hover:text-purple-800 underline">Cookie Policy</a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">13. Children's Privacy Officer</h2>
        <p className="text-gray-700 mb-4">
          We have appointed a Children's Privacy Officer responsible for overseeing our compliance with COPPA and other children's privacy laws. If you have questions or concerns about our children's privacy practices, you may contact our Children's Privacy Officer at:
        </p>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4">
          <p className="text-gray-900 font-semibold">Children's Privacy Officer</p>
          <p className="text-gray-700">Simonova Inc.</p>
          <p className="text-gray-700">Fredericton, New Brunswick, Canada</p>
          <p className="text-gray-700">Email: <a href="mailto:privacy@brindaworld.ca" className="text-purple-700 hover:text-purple-800 underline">privacy@brindaworld.ca</a></p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">14. Your Privacy Rights and How to Exercise Them</h2>
        <p className="text-gray-700 mb-4">
          To exercise any of the rights described in this Privacy Policy, please contact us at:
        </p>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4 mb-4">
          <p className="text-gray-900 font-semibold">Simonova Inc.</p>
          <p className="text-gray-700">Privacy Team</p>
          <p className="text-gray-700">Fredericton, New Brunswick, Canada</p>
          <p className="text-gray-700">Email: <a href="mailto:privacy@brindaworld.ca" className="text-purple-700 hover:text-purple-800 underline">privacy@brindaworld.ca</a></p>
        </div>
        <p className="text-gray-700 mb-4">
          Please include sufficient information to identify yourself and your request. We will respond within 30 days or as required by applicable law. If you are not satisfied with our response, you may have the right to file a complaint with your local data protection authority.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">15. Filing a Complaint</h2>
        <p className="text-gray-700 mb-4">
          If you have concerns about our privacy practices, you may file a complaint with the appropriate regulatory authority in your jurisdiction:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Canada (PIPEDA):</strong> Office of the Privacy Commissioner of Canada</li>
          <li><strong>EU/EEA (GDPR):</strong> Your local data protection authority</li>
          <li><strong>United States (COPPA):</strong> Federal Trade Commission (FTC)</li>
          <li><strong>United Kingdom (GDPR):</strong> Information Commissioner's Office (ICO)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">16. Changes to This Privacy Policy</h2>
        <p className="text-gray-700 mb-4">
          We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of material changes by updating the "Last updated" date and, in some cases, providing additional notice (such as a prominent notice on our website). Your continued use of BrindaWorld after such changes constitutes your acceptance of the updated Privacy Policy.
        </p>
      </section>
    </div>
  );
}
