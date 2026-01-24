export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-light-primary dark:text-dark-primary">Contact</h1>
      <div className="bg-light-background dark:bg-dark-background shadow-lg rounded-lg p-8 border border-light-border dark:border-dark-border">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4 text-light-primary dark:text-dark-primary">Get in Touch</h2>
            <p className="text-light-secondary dark:text-dark-secondary mb-6">
              Feel free to check out my work and connect with me!
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="https://kaifsaleem.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-light-accent dark:bg-dark-accent hover:bg-light-accent/90 dark:hover:bg-dark-accent/90 text-light-background dark:text-dark-background font-medium rounded-md transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                <path d="M10 5a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V6a1 1 0 0 0-1-1zm0 8a1 1 0 1 0 1 1 1 1 0 0 0-1-1z"/>
              </svg>
              Portfolio - kaifsaleem.tech
            </a>

            <a
              href="https://github.com/kaifsaleem"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-light-background dark:bg-dark-background hover:bg-light-border dark:hover:bg-dark-border text-light-primary dark:text-dark-primary font-medium rounded-md transition-colors border border-light-border dark:border-dark-border"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub - @kaifsaleem
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
