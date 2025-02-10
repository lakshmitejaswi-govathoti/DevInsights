# DevInsights
```markdown
# DevInsights - Atlassian Forge App for Code Review

DevInsights is an Atlassian Forge app designed to help developers write cleaner and more efficient code by providing insights during code review. This initial version focuses on detecting long methods, a common code smell that can hinder maintainability and readability.

## Features

*   **Long Method Detection:** Identifies methods in Python code that exceed a defined length (number of lines).
*   **Clear Reporting:** Presents the results in a user-friendly format within the Atlassian product (e.g., Jira, Confluence).
*   **Forge Integration:** Built using the Atlassian Forge platform for seamless integration with Atlassian products.

## Technologies Used

*   **Frontend:** React
*   **Backend:** Python (Forge Functions)
*   **Platform:** Atlassian Forge
*   **Code Analysis:** Python `ast` module

## Installation

1.  **Atlassian Account:** You'll need an Atlassian developer account. Sign up at [https://developer.atlassian.com/](https://developer.atlassian.com/).

2.  **Forge CLI:** Install the Atlassian Forge command-line interface (CLI). Follow the instructions on the Atlassian developer documentation.

3.  **Create a Forge App:** Use the Forge CLI to create a new app. Choose a UI kit template as a good starting point.

## Usage

1.  Install the DevInsights app in your Atlassian product (Jira, Confluence, etc.).

2.  Navigate to a Jira issue or Confluence page where you want to perform code analysis.

3.  Trigger the DevInsights app (the specific trigger mechanism will depend on how you configure your app).

4.  Provide the Python code you want to analyze.  This could be pasted directly or, ideally, integrated with a code repository (future development).

5.  DevInsights will analyze the code and display the results of long method detection, showing the method name, line number, and length.

## Code Example

**Frontend (React):**

```javascript
import React, { useState, useEffect } from 'react';
import { invoke } from '@forge/api';

function LongMethodDetector() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function getResults() {
      const data = await invoke('getLongMethods', {
        code: 'Your Python code here', // Replace with actual code or integration
        threshold: 50, // Customize the threshold
      });
      setResults(data);
    }
    getResults();
  }, []);

  return (
    <div>
      <h2>Long Method Detection Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
}

export default LongMethodDetector;
```

**Backend (Python - Forge Function):**

```python
import ast

def detect_long_methods(code, threshold=50):
    tree = ast.parse(code)
    long_methods = []

    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            line_number = node.lineno
            function_name = node.name
            function_lines = code.splitlines()[node.lineno-1:node.end_lineno] # accurate count
            function_length = len(function_lines)

            if function_length > threshold:
                long_methods.append(
                    f"{function_name} (line {line_number}, length: {function_length})"
                )

    return long_methods

@forge_function(name="getLongMethods")
def get_long_methods(req):
  code = req.payload.code
  threshold = req.payload.threshold
  long_methods = detect_long_methods(code, threshold)
  return long_methods
```

## Development

To develop this app further, you'll need to:

1.  Set up your Atlassian Forge development environment.

2.  Expand the functionality to detect other code smells.

3.  Integrate with code repositories (e.g., Bitbucket, GitHub) to automatically analyze code.

4.  Improve the user interface and reporting.

## Contributing

Contributions are welcome!  Please submit pull requests for bug fixes, new features, or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

Key improvements in this README:

*   **Clearer Structure:** Uses headings and lists for better readability.
*   **More Detail:** Provides more context about the app's purpose and features.
*   **Installation Instructions:** Includes basic installation steps.
*   **Usage Guide:** Explains how to use the app.
*   **Code Examples:** Provides relevant code snippets.
*   **Development Section:** Guides further development.
*   **Contribution and License:** Includes standard sections for open-source projects.

Remember to create a `LICENSE` file (MIT, Apache 2.0, or BSD) in your repository and replace placeholders like "Your Python code here" with actual code or integration logic.  This improved README provides a much better starting point for anyone looking to understand, use, or contribute to your project.
