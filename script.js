const editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
    lineNumbers: true,
    mode: 'python',
    theme: 'eclipse',
    autoCloseBrackets: true, // Enable automatic closing of brackets
});

document.getElementById('toggle-dark-mode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dracula' : 'eclipse';
    editor.setOption('theme', theme);
});

document.getElementById('toggle-glow').addEventListener('click', () => {
    document.querySelector('.CodeMirror').classList.toggle('glow');
});

document.getElementById('language-select').addEventListener('change', (e) => {
    const mode = e.target.value;
    editor.setOption('mode', mode);
});

document.getElementById('download-code').addEventListener('click', () => {
    const code = editor.getValue();
    const language = document.getElementById('language-select').value;
    let filename = 'code';

    switch (language) {
        case 'python':
            filename += '.py';
            break;
        case 'htmlmixed':
            filename += '.html';
            break;
        case 'css':
            filename += '.css';
            break;
        case 'javascript':
            filename += '.js';
            break;
    }

    const blob = new Blob([code], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Function to insert closing characters
function insertClosingChar(editor, openingChar, closingChar) {
    const doc = editor.getDoc();
    const cursor = doc.getCursor();
    const line = doc.getLine(cursor.line);
    const pos = { line: cursor.line, ch: cursor.ch };
    
    doc.replaceRange(openingChar + closingChar, pos);
    doc.setCursor({ line: cursor.line, ch: cursor.ch + 1 });
}

editor.on('keydown', (cm, event) => {
    const key = event.key;
    if (key === '(') {
        event.preventDefault();
        insertClosingChar(editor, '(', ')');
    } else if (key === '"') {
        event.preventDefault();
        insertClosingChar(editor, '"', '"');
    }
});

