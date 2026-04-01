export default function AccessibilityStatement() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Accessibility Statement</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: April 1, 2026</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Commitment to Accessibility</h2>
        <p className="text-gray-700 mb-4">
          Simonova Inc. is committed to ensuring that BrindaWorld is accessible to all users, including those with disabilities. We believe that inclusive design benefits everyone and is essential for providing equitable access to education. We are dedicated to providing an accessible, usable, and enjoyable experience for all users, regardless of ability or disability.
        </p>
        <p className="text-gray-700 mb-4">
          BrindaWorld is designed and continuously improved to meet or exceed accessibility standards, including the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, with a goal of achieving Level AAA compliance. We also align with the UN Convention on the Rights of Persons with Disabilities (UN CRPD) and Harvard and MIT's Universal Design principles.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">WCAG 2.1 Compliance</h2>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Current Compliance Level: AA</h3>
        <p className="text-gray-700 mb-4">
          BrindaWorld is designed to conform to Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. WCAG 2.1 provides recommendations for making web content more accessible to people with disabilities. These guidelines address accessibility of web content to people with visual, auditory, physical, speech, cognitive, language, learning, and neurological disabilities.
        </p>
        <p className="text-gray-700 mb-4">
          The WCAG 2.1 guidelines are organized around four principles that make web content more accessible:
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Perceivable</h3>
        <p className="text-gray-700 mb-4">
          Information and user interface components must be presentable to users in ways they can perceive:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Text Alternatives:</strong> All images have descriptive alt text</li>
          <li><strong>Color Contrast:</strong> Text has sufficient contrast against backgrounds (WCAG AA: 4.5:1 for normal text, 3:1 for large text)</li>
          <li><strong>Color Independence:</strong> Information is not conveyed by color alone; we use icons, patterns, and text</li>
          <li><strong>Adjustable Text:</strong> Text can be resized without loss of functionality up to 200%</li>
          <li><strong>Responsive Design:</strong> Content reflows properly on different screen sizes</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Operable</h3>
        <p className="text-gray-700 mb-4">
          User interface components and navigation must be operable:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Keyboard Navigation:</strong> All functionality is accessible via keyboard without a mouse</li>
          <li><strong>Tab Order:</strong> Logical tab order allows keyboard users to navigate efficiently</li>
          <li><strong>Focus Indicators:</strong> A visible focus indicator shows which element has keyboard focus</li>
          <li><strong>Skip Links:</strong> "Skip to content" links allow users to bypass repetitive navigation</li>
          <li><strong>No Keyboard Traps:</strong> Users can navigate away from any element using keyboard</li>
          <li><strong>Sufficient Time:</strong> No content has automatically updating, moving, or blinking elements (3+ seconds) without user control</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Understandable</h3>
        <p className="text-gray-700 mb-4">
          Information and user interface operations must be understandable:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Clear Language:</strong> Content is written in plain language appropriate for the target age group</li>
          <li><strong>Consistent Navigation:</strong> Navigation appears in consistent locations and behaves predictably</li>
          <li><strong>Form Labels:</strong> All form inputs have associated labels and clear instructions</li>
          <li><strong>Error Prevention and Recovery:</strong> Form errors are identified clearly, and solutions are provided</li>
          <li><strong>Headings and Structure:</strong> Content uses proper heading hierarchy (H1, H2, H3) for screen readers</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Robust</h3>
        <p className="text-gray-700 mb-4">
          Content must be robust enough that it can be interpreted reliably by a wide variety of user agents (browsers, screen readers, etc.):
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Valid HTML:</strong> BrindaWorld uses semantic HTML5 that validates against W3C standards</li>
          <li><strong>ARIA Support:</strong> We use ARIA (Accessible Rich Internet Applications) attributes where necessary to enhance accessibility</li>
          <li><strong>Browser Compatibility:</strong> BrindaWorld works with all major browsers and assistive technologies</li>
          <li><strong>Screen Reader Support:</strong> Content is fully compatible with popular screen readers</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Specific Accessibility Features</h2>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Screen Reader Support</h3>
        <p className="text-gray-700 mb-4">
          BrindaWorld is fully compatible with popular screen readers including NVDA (Windows), JAWS (Windows), and VoiceOver (Mac/iOS):
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>All interactive elements have descriptive labels</li>
          <li>Image alt text describes content and function</li>
          <li>Links have descriptive anchor text (not "click here")</li>
          <li>Form errors are announced clearly</li>
          <li>Dynamic content updates are announced to screen readers</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Color Blindness Accommodations</h3>
        <p className="text-gray-700 mb-4">
          BrindaWorld is designed to be accessible to users with color vision deficiencies:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>No information is conveyed by color alone</li>
          <li>We use patterns, icons, and text labels in addition to colors</li>
          <li>Color palettes are tested for visibility by users with protanopia, deuteranopia, and tritanopia</li>
          <li>Users can enable a high contrast mode for enhanced readability</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Text Resizing and Zoom</h3>
        <p className="text-gray-700 mb-4">
          Users can adjust text size and zoom without loss of functionality:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Text can be resized from browser settings or accessibility controls</li>
          <li>Content reflows properly when text is enlarged</li>
          <li>Users can zoom up to 200% without horizontal scrolling</li>
          <li>Interactive elements remain fully functional at larger sizes</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Keyboard Navigation</h3>
        <p className="text-gray-700 mb-4">
          Full keyboard navigation is supported without requiring a mouse:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Tab key navigates forward through interactive elements</li>
          <li>Shift+Tab navigates backward</li>
          <li>Enter key activates buttons and links</li>
          <li>Arrow keys navigate menus and selectors</li>
          <li>Escape key closes modals and menus</li>
          <li>No keyboard traps prevent navigation away from any element</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Reduced Motion Support</h3>
        <p className="text-gray-700 mb-4">
          BrindaWorld respects the "prefers-reduced-motion" setting:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Animations and transitions are disabled for users who prefer reduced motion</li>
          <li>Content is still fully functional without animations</li>
          <li>Parallax scrolling and other motion effects are disabled</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">High Contrast Mode</h3>
        <p className="text-gray-700 mb-4">
          Users can enable high contrast mode for enhanced visibility:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>High contrast theme with improved text-to-background ratios</li>
          <li>Darker colors for easier distinction between elements</li>
          <li>Accessibility settings are saved in user preferences</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Readable Fonts</h3>
        <p className="text-gray-700 mb-4">
          BrindaWorld uses readable, easily distinguishable fonts:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Sans-serif fonts chosen for readability on screens</li>
          <li>Adequate line spacing (1.5 or greater) for readability</li>
          <li>Font sizes appropriate for the target age group (6-14)</li>
          <li>Dyslexia-friendly fonts available as an accessibility option</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Universal Design Principles</h2>
        <p className="text-gray-700 mb-4">
          BrindaWorld is designed according to Universal Design principles developed at Harvard and MIT, which emphasize creating products that are usable by all people, to the greatest extent possible, without the need for adaptation:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Equitable Use:</strong> The design is useful and marketable to people with diverse abilities</li>
          <li><strong>Flexible Use:</strong> The design accommodates a wide range of individual preferences and abilities</li>
          <li><strong>Simple and Intuitive Use:</strong> The design is easy to understand regardless of experience, knowledge, language skills, or concentration level</li>
          <li><strong>Perceptible Information:</strong> The design communicates necessary information effectively to users with diverse sensory abilities</li>
          <li><strong>Tolerance for Error:</strong> The design minimizes hazards and adverse consequences of accidental or unintended actions</li>
          <li><strong>Low Physical Effort:</strong> The design can be used efficiently and comfortably with minimal fatigue</li>
          <li><strong>Size and Space for Approach and Use:</strong> Appropriate size and space is provided for approach, reach, manipulation, and use regardless of user's body size, posture, or mobility</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">UN Convention on the Rights of Persons with Disabilities</h2>
        <p className="text-gray-700 mb-4">
          BrindaWorld is designed in alignment with the UN Convention on the Rights of Persons with Disabilities (UN CRPD), which affirms that persons with disabilities have the right to education without discrimination and on the basis of equal opportunity. We are committed to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Ensuring full inclusion and participation in educational services</li>
          <li>Providing reasonable accommodations to support learning</li>
          <li>Preventing discrimination based on disability</li>
          <li>Supporting the development and use of universal design and accessible technologies</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Ongoing Improvements</h2>
        <p className="text-gray-700 mb-4">
          We are committed to continuous improvement of BrindaWorld's accessibility:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>We regularly conduct automated accessibility testing using tools like axe, Lighthouse, and WAVE</li>
          <li>We perform manual testing with actual assistive technologies</li>
          <li>We conduct usability testing with users with disabilities</li>
          <li>We monitor and address accessibility issues reported by users</li>
          <li>We stay current with accessibility standards and best practices</li>
          <li>We work toward WCAG 2.1 Level AAA compliance over time</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Accessibility Features for Children</h2>
        <p className="text-gray-700 mb-4">
          BrindaWorld is specifically designed with accessibility in mind for our target age group of girls ages 6-14:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Large, easy-to-tap touch targets for younger users</li>
          <li>Age-appropriate language and navigation</li>
          <li>Clear visual hierarchy with large, readable fonts</li>
          <li>Minimal distracting animations or autoplay content</li>
          <li>Support for children with learning disabilities (dyslexia, dyscalculia)</li>
          <li>Customizable accessibility settings saved in user profiles</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Known Accessibility Limitations</h2>
        <p className="text-gray-700 mb-4">
          While we strive for full accessibility, BrindaWorld may have some limitations:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Some educational videos may not have captions yet (we are working to add captions to all video content)</li>
          <li>Third-party embedded content may have accessibility limitations beyond our control</li>
          <li>Very new features may not yet have full accessibility testing</li>
        </ul>
        <p className="text-gray-700 mb-4">
          We are actively working to address these limitations and welcome feedback from users.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How to Report Accessibility Issues</h2>
        <p className="text-gray-700 mb-4">
          If you encounter any accessibility barriers or issues while using BrindaWorld, please contact us. Your feedback helps us improve the accessibility of the Service:
        </p>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 my-4">
          <p className="text-gray-900 font-semibold">Accessibility Contact</p>
          <p className="text-gray-700">Simonova Inc.</p>
          <p className="text-gray-700">Fredericton, New Brunswick, Canada</p>
          <p className="text-gray-700">Email: <a href="mailto:privacy@brindaworld.ca" className="text-purple-700 hover:text-purple-800 underline">privacy@brindaworld.ca</a></p>
          <p className="text-gray-700 mt-4 font-semibold">Please include:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Description of the accessibility issue</li>
            <li>Page or feature affected</li>
            <li>Your device, browser, and assistive technology (if applicable)</li>
            <li>Steps to reproduce the issue</li>
          </ul>
        </div>
        <p className="text-gray-700 mb-4">
          We aim to respond to accessibility reports within 5 business days and to address issues promptly.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Additional Resources</h2>
        <p className="text-gray-700 mb-4">
          For more information about web accessibility, see these resources:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Web Content Accessibility Guidelines (WCAG):</strong> <a href="https://www.w3.org/WAI/WCAG21/quickref/" className="text-purple-700 hover:text-purple-800 underline" target="_blank" rel="noopener noreferrer">W3C WCAG 2.1</a></li>
          <li><strong>Accessible Rich Internet Applications (ARIA):</strong> <a href="https://www.w3.org/WAI/ARIA/apg/" className="text-purple-700 hover:text-purple-800 underline" target="_blank" rel="noopener noreferrer">W3C ARIA Authoring Practices</a></li>
          <li><strong>Universal Design:</strong> <a href="https://universaldesign.org/" className="text-purple-700 hover:text-purple-800 underline" target="_blank" rel="noopener noreferrer">Universal Design Organization</a></li>
          <li><strong>UN CRPD:</strong> <a href="https://www.un.org/development/desa/disabilities/convention-on-the-rights-of-persons-with-disabilities.html" className="text-purple-700 hover:text-purple-800 underline" target="_blank" rel="noopener noreferrer">UN Convention on the Rights of Persons with Disabilities</a></li>
        </ul>
      </section>
    </div>
  );
}
