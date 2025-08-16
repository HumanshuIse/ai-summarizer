// frontend/src/App.jsx
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import './App.css';

function App() {
  const [transcript, setTranscript] = useState('');
  const [prompt, setPrompt] = useState('Summarize in bullet points for executives');
  const [summary, setSummary] = useState('');
  const [recipients, setRecipients] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [format, setFormat] = useState('plaintext');

  const handleGenerateSummary = async () => {
    if (!transcript.trim()) {
      toast.error('Please provide a transcript.');
      return;
    }
    setIsLoading(true);
    toast.loading('Generating summary...');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript, prompt }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to generate summary.');
      }

      const data = await response.json();
      setSummary(data.summary);
      toast.dismiss();
      toast.success('Summary generated successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (!summary.trim() || !recipients.trim()) {
      toast.error('Please ensure you have a summary and recipient emails.');
      return;
    }
    setIsLoading(true);
    toast.loading('Sending email...');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary, recipients, format }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to send email.');
      }
      
      toast.dismiss();
      toast.success('Summary shared successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Toaster position="top-center" />
      <div className="card">
        <h1>AI Meeting Summarizer 📝</h1>

        <label htmlFor="transcript">1. Paste Your Meeting Transcript</label>
        <textarea
          id="transcript"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          rows={10}
          placeholder="Paste your meeting notes or transcript here..."
          disabled={isLoading}
        />

        <label htmlFor="prompt">2. Enter Your Instruction</label>
        <input
          id="prompt"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'Highlight only action items'"
          disabled={isLoading}
        />

        <button onClick={handleGenerateSummary} disabled={isLoading} className="btn-primary">
          {isLoading ? 'Generating...' : '✨ Generate Summary'}
        </button>

        {summary && (
          <div className="summary-section">
            <label htmlFor="summary">3. Review and Edit Your Summary</label>
            <textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={12}
              className="summary-output"
            />
          </div>
        )}

        {summary && (
          <div className="share-section">
            <label htmlFor="recipients">4. Share via Email</label>
            <input
              id="recipients"
              type="email"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              placeholder="Enter recipient emails, separated by commas"
            />
            
            <label htmlFor="format">Select Format:</label>
            <select 
              id="format" 
              value={format} 
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="plaintext">Plain Text (in email body)</option>
              <option value="pdf">PDF Attachment</option>
              <option value="docx">DOCX Attachment</option>
            </select>

            <button onClick={handleShare} disabled={isLoading} className="btn-secondary">
              {isLoading ? 'Sending...' : '📧 Share Summary'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;