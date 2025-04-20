import { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Upload, Bot, User } from 'lucide-react';
import Navbar from '../components/About/NavBar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setIsUploading(true);

      // Create form-data for the file upload
      const formData = new FormData();
      formData.append('file', file);

      try {
        // Make the Axios POST request to upload the PDF
        const response = await axios.post('http://127.0.0.1:5000/api/process-pdf', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('PDF Upload Response:', response.data);

        setIsUploading(false);
        setMessages([
          {
            role: 'assistant',
            content: `I've received your PDF document. How can I help you analyze your company data?`,
          },
        ]);
      } catch (error) {
        console.error('Error uploading PDF:', error);
        setIsUploading(false);
        setMessages([
          {
            role: 'assistant',
            content: `There was an error processing your PDF. Please try again.`,
          },
        ]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    try {
      // Make the Axios POST request to query the chatbot
      const response = await axios.post('http://127.0.0.1:5000/api/query-pdf', {
        query: input,
      });

      console.log('Chatbot Query Response:', response.data);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.data.answer || 'I could not find an answer to your query.',
        },
      ]);
    } catch (error) {
      console.error('Error querying chatbot:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `There was an error processing your query. Please try again.`,
        },
      ]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-extrabold text-gray-900">
              <span className="text-green-600">Arkos</span> Assistant
            </h1>
            <p className="mt-2 text-gray-600">Upload your company's PDF to get started</p>
          </motion.div>

          {!pdfFile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center"
            >
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Upload className="h-8 w-8 text-green-600" />
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Upload PDF
                </span>
              </label>
            </motion.div>
          )}

          {isUploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600"
            >
              Processing your document...
            </motion.div>
          )}

          {pdfFile && !isUploading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="h-[500px] overflow-y-auto p-4">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      } mb-4`}
                    >
                      <div
                        className={`flex items-start max-w-[80%] ${
                          message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                        }`}
                      >
                        <div
                          className={`p-2 rounded-full ${
                            message.role === 'user' ? 'bg-green-100' : 'bg-gray-100'
                          } ml-2`}
                        >
                          {message.role === 'user' ? (
                            <User className="h-5 w-5 text-green-600" />
                          ) : (
                            <Bot className="h-5 w-5 text-gray-600" />
                          )}
                        </div>
                        <div
                          className={`p-4 rounded-2xl ${
                            message.role === 'user'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="ml-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

export default AIChatbot;