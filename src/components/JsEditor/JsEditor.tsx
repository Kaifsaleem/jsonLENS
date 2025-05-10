import React, { useState } from 'react';

interface JsEditorProps {
  onCodeSubmit: (code: string) => void;
}

export const JsEditor: React.FC<JsEditorProps> = ({ onCodeSubmit }) => {
  const [code, setCode] = useState(`// Example of Js Query

// 1.all active users
const activeUsers = data.users.filter(user => user.isActive);

// 2. Emails of users over 30
const emailsOver30 = data.users.filter(u => u.age > 30).map(u => u.email);

// 3. Users with 'developer' tag
const devUsers = data.users.filter(user => user.tags.includes("developer"));

// 4. Products in stock
const inStockProducts = data.products.filter(p => p.inStock);

// 5. Products under $500
const cheapProducts = data.products.filter(p => p.price < 500);

// 6. Product names in 'electronics'
const electronics = data.products
  .filter(p => p.category === "electronics")
  .map(p => p.name);

// 7. Is dark mode enabled
const isDarkModeOn = data.settings.darkMode;

// 8. Names of users with 'frontend' tag
const frontendUserNames = data.users
  .filter(user => user.tags.includes("frontend"))
  .map(user => user.name);

 return {
    activeUsers,
    emailsOver30,
    devUsers,
    inStockProducts,
    cheapProducts,
    electronics,
    isDarkModeOn,
    frontendUserNames
  };`);

  const handleSubmit = () => {
    onCodeSubmit(code);
  };

  return (
    <div className="flex flex-col gap-3">
      <textarea
        className="w-full h-68 p-3 font-mono text-sm bg-light-background dark:bg-dark-background text-light-primary dark:text-dark-primary border border-light-border dark:border-dark-border rounded focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        // placeholder="Enter JavaScript code here. Use 'data' to reference the JSON data.
        // Example: data.map(item => item.value)"
        // defaultValue={}
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-light-accent dark:bg-dark-accent text-light-background dark:text-dark-background rounded-md hover:bg-light-accent/90 dark:hover:bg-dark-accent/90 transition-colors"
      >
        Execute
      </button>
    </div>
  );
};
