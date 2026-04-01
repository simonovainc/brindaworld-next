export default function COPPACompliance() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">COPPA Compliance</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: April 1, 2026</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What is COPPA?</h2>
        <p className="text-gray-700 mb-4">
          The Children's Online Privacy Protection Act (COPPA) is a federal law enacted by the United States Congress that protects the online privacy of children under 13 years of age. COPPA applies to websites, online services, and applications that are directed to children under 13 or that knowingly collect personal information from children under 13.
        </p>
        <p className="text-gray-700 mb-4">
          COPPA is enforced by the Federal Trade Commission (FTC) and requires that we obtain verifiable parental consent before collecting, using, or disclosing personal information from children. Additionally, COPPA prohibits behavioral advertising to children and requires that we implement reasonable data security measures.
        </p>
        <p className="text-gray-700 mb-4">
          BrindaWorld is designed for girls ages 6 to 14, and a significant portion of our user base is under 13. Therefore, we fully comply with COPPA and have implemented comprehensive measures to protect the privacy of children under 13.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How BrindaWorld Complies with COPPA</h2>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Verifiable Parental Consent</h3>
        <p className="text-gray-700 mb-4">
          Before we collect any personal information from a child under 13, we require verifiable parental consent from the child's parent or legal guardian. Our consent process works as follows:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>The parent creates an account and provides their email address</li>
          <li>We send a confirmation email to the parent's email address</li>
          <li>The parent must click a link in the confirmation email to verify their email address and consent to the collection of their child's information</li>
          <li>Only after email verification is complete can the child access the Service</li>
        </ul>
        <p className="text-gray-700 mb-4">
          This email verification process serves as our mechanism for obtaining verifiable parental consent as required by COPPA.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Data Minimization</h3>
        <p className="text-gray-700 mb-4">
          We collect only the minimum personal information necessary to provide educational services to children. For children under 13, we collect:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>First name only</strong> (not last name, date of birth, or full legal name)</li>
          <li><strong>Age</strong> (used to provide age-appropriate educational content)</li>
          <li><strong>Avatar or profile picture</strong> (optional, chosen by parent or child)</li>
          <li><strong>Learning activity and progress data</strong> (necessary to deliver educational services)</li>
        </ul>
        <p className="text-gray-700 mb-4">
          We do not collect or request: home address, phone number, social security number, exact date of birth, school name, or any other sensitive personal information. We also do not require children to disclose more information than is reasonably necessary for educational purposes.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Prohibition on Behavioral Advertising</h3>
        <p className="text-gray-700 mb-4">
          COPPA strictly prohibits targeted advertising based on a child's personal information or browsing behavior. BrindaWorld fully complies with this requirement:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>We do NOT engage in behavioral advertising to children</li>
          <li>We do NOT build or maintain profiles of children's interests, preferences, or behaviors for advertising purposes</li>
          <li>We do NOT use data about children's activities to target them with personalized advertisements</li>
          <li>We do NOT allow third-party advertisers to collect data about children for behavioral advertising</li>
          <li>Any advertising content displayed (if applicable) is generic and context-based, not targeted based on personal data</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. No Third-Party Sharing of Children's Data</h3>
        <p className="text-gray-700 mb-4">
          COPPA requires that we do not share children's personal information with third parties except in limited circumstances. BrindaWorld protects children's privacy by:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>NOT sharing children's personal information with third parties for any advertising or marketing purposes</li>
          <li>NOT selling, licensing, or trading children's personal information</li>
          <li>Sharing children's data only with service providers (such as Supabase for secure data storage) under strict confidentiality agreements</li>
          <li>Disclosing children's information only when required by law or to protect the safety of the child or others</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Data Security</h3>
        <p className="text-gray-700 mb-4">
          We implement comprehensive security measures to protect children's personal information from unauthorized access, disclosure, alteration, or destruction:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>TLS 1.2+ encryption for all data in transit</li>
          <li>AES-256 encryption for data at rest in our database</li>
          <li>Row-level security (RLS) to ensure children can access only their own data</li>
          <li>Secure authentication mechanisms and password hashing</li>
          <li>Regular security audits and penetration testing</li>
          <li>Documented incident response procedures</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6. Data Retention and Deletion</h3>
        <p className="text-gray-700 mb-4">
          We retain children's personal information only for as long as necessary to provide educational services:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>While the account is active, we retain information to provide the Service</li>
          <li>When a parent requests deletion, we delete the child's personal information within 30 days</li>
          <li>Learning activity data is retained with the account unless specific deletion is requested</li>
          <li>We do not archive or retain deleted information for marketing or other purposes</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Anonymous Access Without Account Creation</h2>
        <p className="text-gray-700 mb-4">
          BrindaWorld offers anonymous session access that allows visitors to explore educational content without providing any personal information or creating an account. This feature is compliant with COPPA because:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>No personal information is collected during anonymous sessions</li>
          <li>Anonymous users can access educational content without registering</li>
          <li>No tracking or profiling of anonymous users occurs</li>
          <li>The Service is accessible to all users, including children, without requiring account creation</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What Data We Do NOT Collect from Children</h2>
        <p className="text-gray-700 mb-4">
          To minimize privacy risks and comply with COPPA's data minimization principles, we explicitly do NOT collect the following information from children:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Last name or full legal name</li>
          <li>Exact date of birth (we collect age only)</li>
          <li>Home address or zip code</li>
          <li>Phone number or mobile number</li>
          <li>Social security number or government ID number</li>
          <li>Financial information or payment card details</li>
          <li>Biometric information (fingerprints, facial recognition, etc.)</li>
          <li>School name or educational record information</li>
          <li>Religious or political beliefs</li>
          <li>Medical or health information</li>
          <li>Genetic information</li>
          <li>Information about friends or family members</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Parental Rights and Choices</h2>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Right to Require Parental Consent</h3>
        <p className="text-gray-700 mb-4">
          Parents have the right to require that we obtain parental consent before collecting information from their child. BrindaWorld makes parental consent a mandatory requirement before any information collection.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Right to Review Information</h3>
        <p className="text-gray-700 mb-4">
          Parents have the right to request a detailed review of the personal information we have collected about their child. We will provide a complete list of all personal information in our records within 30 days of receiving a written request.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Right to Refuse Collection or Request Deletion</h3>
        <p className="text-gray-700 mb-4">
          Parents have the right to refuse further collection or use of their child's personal information, or to request deletion of information we have already collected. Upon receiving such a request, we will:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Cease collection of information from the child</li>
          <li>Delete the child's personal information from our active databases within 30 days</li>
          <li>Not use previously collected information for any further purpose</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Right to Opt-Out of Future Contact</h3>
        <p className="text-gray-700 mb-4">
          Parents may opt-out of receiving marketing or promotional communications from BrindaWorld. Once opted out, we will not send marketing materials to the parent or child.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How to Exercise Your Parental Rights</h2>
        <p className="text-gray-700 mb-4">
          If you are a parent or guardian and wish to exercise any of the rights described above, please contact us with appropriate verification of your relationship to the child:
        </p>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 my-4">
          <p className="text-gray-900 font-semibold">Children's Privacy Officer</p>
          <p className="text-gray-700">Simonova Inc.</p>
          <p className="text-gray-700">Fredericton, New Brunswick, Canada</p>
          <p className="text-gray-700">Email: <a href="mailto:privacy@brindaworld.ca" className="text-purple-700 hover:text-purple-800 underline">privacy@brindaworld.ca</a></p>
        </div>
        <p className="text-gray-700 mb-4">
          Please include in your request:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>The child's name and account email address</li>
          <li>Your name and relationship to the child (parent/guardian)</li>
          <li>Verification of your identity (a copy of a government ID or other document)</li>
          <li>A clear description of your request (review information, delete data, refuse further collection, etc.)</li>
        </ul>
        <p className="text-gray-700 mb-4">
          We will respond to all requests within 30 days of receiving them.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">COPPA Violation Reporting</h2>
        <p className="text-gray-700 mb-4">
          If you believe that BrindaWorld is not complying with COPPA, you may file a complaint with the Federal Trade Commission (FTC):
        </p>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 my-4">
          <p className="text-gray-900 font-semibold">Federal Trade Commission</p>
          <p className="text-gray-700">Bureau of Consumer Protection</p>
          <p className="text-gray-700">600 Pennsylvania Avenue NW</p>
          <p className="text-gray-700">Washington, DC 20580</p>
          <p className="text-gray-700">Website: <a href="https://reportfraud.ftc.gov" className="text-purple-700 hover:text-purple-800 underline">reportfraud.ftc.gov</a></p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Safe Harbor Compliance</h2>
        <p className="text-gray-700 mb-4">
          BrindaWorld is designed to comply with the FTC's COPPA Safe Harbor requirements for websites and online services. We follow industry best practices for protecting children's privacy and regularly assess our compliance with COPPA standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Additional Information</h2>
        <p className="text-gray-700 mb-4">
          For more comprehensive information about our privacy practices, please review our <a href="/privacy" className="text-purple-700 hover:text-purple-800 underline">Privacy Policy</a>. This COPPA Compliance page highlights our specific protections for children under 13, while our full Privacy Policy covers all aspects of how we collect, use, and protect personal information for all users.
        </p>
        <p className="text-gray-700 mb-4">
          For more information about COPPA and your rights as a parent, visit the <a href="https://www.ftc.gov/business/privacy-security/coppa" className="text-purple-700 hover:text-purple-800 underline" target="_blank" rel="noopener noreferrer">FTC COPPA website</a>.
        </p>
      </section>
    </div>
  );
}
