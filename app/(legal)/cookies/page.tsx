export default function CookiePolicy() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Cookie Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: April 1, 2026</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What Are Cookies?</h2>
        <p className="text-gray-700 mb-4">
          Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. Cookies contain information that can be retrieved by a web server when you visit the website again. Cookies serve various purposes, including remembering your preferences, keeping you logged in, and collecting information about how you use a website.
        </p>
        <p className="text-gray-700 mb-4">
          Cookies can be either "persistent" (stored until they expire or you delete them) or "session" cookies (deleted when you close your browser). Similarly, cookies can be "first-party" (set by the website you are visiting) or "third-party" (set by another domain).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Cookies BrindaWorld Uses</h2>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Essential Cookies (Always Enabled)</h3>
        <p className="text-gray-700 mb-4">
          Essential cookies are necessary for the basic functionality of BrindaWorld. These cookies enable you to use the Service and cannot be disabled:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Authentication Token:</strong> Supabase Auth sets authentication tokens that keep you logged in and maintain your session</li>
          <li><strong>Session ID:</strong> A session identifier that allows the Service to recognize you across page requests</li>
          <li><strong>CSRF Protection:</strong> Cross-Site Request Forgery tokens that protect against unauthorized requests</li>
          <li><strong>Security Tokens:</strong> Tokens used to verify your identity and protect against security threats</li>
        </ul>
        <p className="text-gray-700 mb-4">
          Essential cookies do not require consent because they are necessary for the website to function. These cookies do not track your behavior or collect personal information beyond what is necessary for authentication and security.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Preference Cookies (Optional)</h3>
        <p className="text-gray-700 mb-4">
          Preference cookies remember your choices and settings to enhance your experience:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Language Preference:</strong> Remembers your language selection</li>
          <li><strong>Accessibility Settings:</strong> Stores your accessibility preferences (high contrast, text size, reduced motion, etc.)</li>
          <li><strong>Theme Preference:</strong> Remembers whether you prefer light or dark mode</li>
          <li><strong>UI Layout:</strong> Stores preferences about how you want the interface arranged</li>
        </ul>
        <p className="text-gray-700 mb-4">
          You can control preference cookies through your cookie consent settings. Disabling these cookies will not affect the functionality of BrindaWorld, but you will need to set your preferences again on each visit.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Analytical Cookies (Optional)</h3>
        <p className="text-gray-700 mb-4">
          Analytical cookies help us understand how users interact with BrindaWorld so we can improve the Service:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Page Views and Clicks:</strong> Track which pages are visited and which features are used</li>
          <li><strong>Performance Data:</strong> Measure page load times and performance</li>
          <li><strong>Error Tracking:</strong> Identify and troubleshoot technical issues</li>
          <li><strong>User Interaction:</strong> Understand how users navigate the Service</li>
        </ul>
        <p className="text-gray-700 mb-4">
          Analytical data is collected in an anonymous, aggregated manner and does not identify individual users. We do not use this data for behavioral advertising or marketing purposes.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Marketing and Advertising Cookies (Prohibited for Children)</h3>
        <p className="text-gray-700 mb-4">
          BrindaWorld does NOT use marketing or advertising cookies to track users for behavioral advertising. We do not:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Use cookies to build profiles of children's interests or behaviors</li>
          <li>Allow third-party advertisers to track children through cookies</li>
          <li>Use cookies to display targeted or personalized advertisements to children</li>
          <li>Share cookie data with advertising networks or data brokers</li>
        </ul>
        <p className="text-gray-700 mb-4">
          This practice is consistent with our commitment to COPPA compliance and children's privacy protection.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Third-Party Cookies</h2>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Supabase Auth Cookies</h3>
        <p className="text-gray-700 mb-4">
          Supabase (our authentication and database provider) may set cookies for authentication purposes. These cookies are necessary for logging in and maintaining your session. Supabase's privacy practices are governed by their privacy policy.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Vercel Analytics Cookies</h3>
        <p className="text-gray-700 mb-4">
          Vercel (our hosting provider) may collect technical performance data. This data is not personally identifying and is used to monitor service performance and security.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Third-Party Advertising Networks</h3>
        <p className="text-gray-700 mb-4">
          We do NOT allow third-party advertising networks to set tracking cookies on BrindaWorld. We do not integrate with Google Analytics, Facebook Pixel, or similar tracking services that profile users for advertising purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How to Manage Cookies</h2>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Cookie Consent Banner</h3>
        <p className="text-gray-700 mb-4">
          When you first visit BrindaWorld, a cookie consent banner appears at the bottom of the page. This banner allows you to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Accept all cookies</li>
          <li>Accept only essential cookies</li>
          <li>Customize your cookie preferences</li>
          <li>Access this Cookie Policy</li>
        </ul>
        <p className="text-gray-700 mb-4">
          Essential cookies are always enabled and cannot be disabled. You can choose to enable or disable preference and analytical cookies.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Browser Cookie Settings</h3>
        <p className="text-gray-700 mb-4">
          You can also manage cookies directly through your web browser settings:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies and other site data</li>
          <li><strong>Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
          <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data</li>
          <li><strong>Edge:</strong> Settings &gt; Privacy, search, and services &gt; Clear browsing data</li>
        </ul>
        <p className="text-gray-700 mb-4">
          Most browsers also allow you to set a preference to block third-party cookies entirely. However, disabling essential cookies may prevent you from using BrindaWorld properly.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Opt-Out Tools</h3>
        <p className="text-gray-700 mb-4">
          You can use privacy tools to manage tracking across the web:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Do Not Track (DNT):</strong> Enable DNT in your browser to send a signal requesting no tracking</li>
          <li><strong>Global Privacy Control (GPC):</strong> Use a GPC browser extension or setting to signal your privacy preferences</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Cookie Consent for Children</h2>
        <p className="text-gray-700 mb-4">
          For users under 13 years of age, parental consent must be obtained before we set preference or analytical cookies. The cookie consent banner is disabled for accounts owned by children under 13 until the parent provides consent.
        </p>
        <p className="text-gray-700 mb-4">
          Parents can manage their child's cookie preferences through their parent account settings. Parents may revoke cookie consent at any time by contacting us.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Cookies Stored Locally (localStorage)</h2>
        <p className="text-gray-700 mb-4">
          In addition to cookies, BrindaWorld may use localStorage (a web storage mechanism) to store:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Your cookie consent preferences</li>
          <li>User interface preferences (theme, layout)</li>
          <li>Temporarily cached data for offline functionality</li>
        </ul>
        <p className="text-gray-700 mb-4">
          localStorage does not expire automatically; you can clear it through your browser settings. localStorage is not transmitted to our servers and remains on your device only.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Updates to Cookie Usage</h2>
        <p className="text-gray-700 mb-4">
          Occasionally, we may update our cookie usage to improve the Service or comply with legal requirements. If we make material changes to our cookie practices, we will:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Update this Cookie Policy with an updated "Last modified" date</li>
          <li>Provide notice through the website or email if changes are significant</li>
          <li>Request new consent if required by law</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-4">
          If you have questions about our cookie practices or how to manage cookies on BrindaWorld, please contact us:
        </p>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-gray-900 font-semibold">Simonova Inc.</p>
          <p className="text-gray-700">Fredericton, New Brunswick, Canada</p>
          <p className="text-gray-700">Email: <a href="mailto:privacy@brindaworld.ca" className="text-purple-700 hover:text-purple-800 underline">privacy@brindaworld.ca</a></p>
        </div>
      </section>
    </div>
  );
}
