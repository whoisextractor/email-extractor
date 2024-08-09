##Get email addresses from any raw text data that has an email address

##Explanation:

###Get Input and Options:

**input:** Retrieves the text from the input textarea.

**separator:** Determines the separator based on user selection.

**string:** The string to filter emails by (if applicable).

**groupBy:** The number of emails to group together.

**addressType:** Whether to extract emails or URLs.

**filterType:** Whether to include or exclude emails based on string.

**removeKeywords:** An array of keywords to exclude from the results (if UseKeyword is checked).

**Set Email Regex:**

Selects the appropriate regular expression based on addressType and RemoveNumeric checkbox.
Extract and Filter:

**rawEmails:** Extracts potential emails/URLs using the regex.

**uniqueEmails:** Uses a Set to get unique emails efficiently.

**filteredEmails:** Filters emails based on filterType, string, and removeKeywords (if UseKeyword is checked).

**Sort (Optional):**

Sorts the filteredEmails alphabetically if the sort checkbox is checked.

**Format Output:**

Joins the filteredEmails with the chosen separator and groups them if groupBy is specified.

**Display Results:**

Updates the count input with the number of extracted emails.
Sets the output textarea's value to the formatted email string.