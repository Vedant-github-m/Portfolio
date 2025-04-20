'use client';
import { useState, FormEvent } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div id="contact" style={{ padding: '80px 20px', position: 'relative' }}>
      {/* Gradient background */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '300px',
        background: 'radial-gradient(circle at center, rgba(145, 94, 255, 0.2) 0%, rgba(0, 0, 0, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div>
          <p style={{ 
            color: '#aaa6c3', 
            fontWeight: '500', 
            fontSize: '14px', 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            display: 'inline-block',
            background: 'linear-gradient(90deg, #915eff, #ff5e91)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Get in touch</p>
          <h2 style={{ color: 'white', fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>Contact.</h2>
        </div>

        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '40px', 
          marginTop: '20px',
          justifyContent: 'space-between'
        }}>
          <div style={{ 
            flex: '1 1 300px', 
            maxWidth: '500px',
            backgroundColor: 'rgba(21, 16, 48, 0.5)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
          }}>
            <h3 style={{ 
              color: 'white', 
              fontSize: '28px', 
              fontWeight: 'bold', 
              marginBottom: '16px',
              background: 'linear-gradient(90deg, #fff, #915eff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Let's work together</h3>
            <p style={{ color: '#aaa6c3', fontSize: '16px', lineHeight: '1.8' }}>
              I'm always open to new opportunities, collaborations, and interesting projects. 
              Whether you have a question, proposal, or just want to say hello, feel free to reach out. 
              I'll get back to you as soon as possible.
            </p>
            
            <div style={{ marginTop: '40px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '20px'
              }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  backgroundColor: 'rgba(21, 16, 48, 0.8)',
                  borderRadius: '12px',
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  marginRight: '16px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#915eff" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" />
                  </svg>
                </div>
                <div>
                  <p style={{ color: '#aaa6c3', fontSize: '14px', marginBottom: '4px' }}>Email</p>
                  <a 
                    href="mailto:murotiyav@gmail.com"
                    style={{ 
                      color: 'white', 
                      fontWeight: '500',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#915eff'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'white'}
                  >
                    murotiyav@gmail.com
                  </a>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center'
              }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  backgroundColor: 'rgba(21, 16, 48, 0.8)',
                  borderRadius: '12px',
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  marginRight: '16px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#915eff" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
                  </svg>
                </div>
                <div>
                  <p style={{ color: '#aaa6c3', fontSize: '14px', marginBottom: '4px' }}>Location</p>
                  <a 
                    href="https://www.google.com/maps/place/Vadodara,+Gujarat"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      color: 'white', 
                      fontWeight: '500',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#915eff'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'white'}
                  >
                    Vadodara, Gujarat
                  </a>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '40px', display: 'flex', gap: '16px' }}>
              {['github', 'twitter', 'linkedin', 'instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    backgroundColor: 'rgba(21, 16, 48, 0.8)',
                    borderRadius: '50%',
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#915eff" xmlns="http://www.w3.org/2000/svg">
                    {social === 'github' && <path d="M12 2C6.477 2 2 6.477 2 12C2 16.4183 4.69522 20.1677 8.5 21.4999C9 21.5826 9.16667 21.2843 9.16667 21.0208C9.16667 20.7824 9.16667 20.1577 9.16667 19.2916C6.66667 19.9026 6.08333 17.9166 6.08333 17.9166C5.66667 16.8333 5.0275 16.5416 5.0275 16.5416C4.16667 15.9166 5.08917 15.9166 5.08917 15.9166C6.04167 15.9773 6.5 16.9375 6.5 16.9375C7.33333 18.4375 8.72917 17.9583 9.16667 17.7083C9.25 17.0773 9.5 16.6466 9.75 16.4166C7.75 16.1866 5.66667 15.375 5.66667 11.5C5.66667 10.3833 6.04167 9.5 6.5 8.74999C6.41667 8.49749 6.08333 7.49999 6.58333 6.16666C6.58333 6.16666 7.39583 5.89583 9.16667 7.08332C10 6.84582 10.9167 6.74999 11.8333 6.74999C12.75 6.74999 13.6667 6.84582 14.5 7.08332C16.2708 5.88333 17.0833 6.16666 17.0833 6.16666C17.5833 7.5 17.25 8.49749 17.1667 8.74999C17.625 9.5 18 10.3833 18 11.5C18 15.375 15.9167 16.1866 13.9167 16.4166C14.25 16.7083 14.5833 17.2916 14.5833 18.125V21.0208C14.5833 21.2843 14.75 21.5914 15.25 21.4999C19.0548 20.1677 21.75 16.4183 21.75 12C21.75 6.477 17.273 2 11.75 2H12Z" />}
                    {social === 'twitter' && <path d="M24 4.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4v.1c0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H2c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8" />}
                    {social === 'linkedin' && <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />}
                    {social === 'instagram' && <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.045.977.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.987-.01 4.04-.058.977-.045 1.504-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.058-4.04-.058zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.671a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />}
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div style={{ 
            flex: '1 1 400px', 
            maxWidth: '600px',
            backgroundColor: 'rgba(21, 16, 48, 0.5)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
          }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="name" style={{ display: 'block', color: 'white', marginBottom: '8px', fontSize: '14px' }}>Your Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    borderRadius: '8px', 
                    backgroundColor: 'rgba(21, 16, 48, 0.8)', 
                    border: '1px solid #333',
                    color: 'white',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="email" style={{ display: 'block', color: 'white', marginBottom: '8px', fontSize: '14px' }}>Your Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    borderRadius: '8px', 
                    backgroundColor: 'rgba(21, 16, 48, 0.8)', 
                    border: '1px solid #333',
                    color: 'white',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '32px' }}>
                <label htmlFor="message" style={{ display: 'block', color: 'white', marginBottom: '8px', fontSize: '14px' }}>Your Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    borderRadius: '8px', 
                    backgroundColor: 'rgba(21, 16, 48, 0.8)', 
                    border: '1px solid #333',
                    color: 'white',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: '#915eff',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  padding: '14px 32px',
                  borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: loading ? 0.7 : 1,
                  boxShadow: '0 4px 16px rgba(145, 94, 255, 0.3)'
                }}
              >
                {loading ? (
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid rgba(255, 255, 255, 0.3)', borderTopColor: 'white' }} />
                ) : success ? 'Message Sent!' : 'Send Message'}
              </button>
              
              {success && (
                <div style={{ marginTop: '20px', color: '#4BB543', padding: '10px', backgroundColor: 'rgba(75, 181, 67, 0.1)', borderRadius: '8px' }}>
                  Thank you for your message! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 