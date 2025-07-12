import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/sections/HeroSection';
import './Messages.css';

const Messages = () => {
  return (
    <Layout>
      <div className="messages-page">
        <HeroSection
          title="Messages"
          subtitle="Connect with other community members and arrange item exchanges"
          showButton={false}
        />
        
        <div className="messages-content">
          <div className="container">
            <div className="messages-grid">
              {/* Messages Sidebar */}
              <div className="messages-sidebar">
                <div className="messages-header">
                  <h3>Conversations</h3>
                  <button className="new-message-btn">
                    <i className="fas fa-plus"></i>
                    New Message
                  </button>
                </div>
                
                <div className="conversation-list">
                  <div className="conversation-item active">
                    <div className="conversation-avatar">
                      <img src="https://via.placeholder.com/40x40" alt="User" />
                      <div className="online-indicator"></div>
                    </div>
                    <div className="conversation-content">
                      <h4>Emma Wilson</h4>
                      <p>Thanks for the dress! It's perfect...</p>
                      <span className="message-time">2 min ago</span>
                    </div>
                    <div className="unread-badge">2</div>
                  </div>

                  <div className="conversation-item">
                    <div className="conversation-avatar">
                      <img src="https://via.placeholder.com/40x40" alt="User" />
                    </div>
                    <div className="conversation-content">
                      <h4>Mike Johnson</h4>
                      <p>Is the jacket still available?</p>
                      <span className="message-time">1 hour ago</span>
                    </div>
                  </div>

                  <div className="conversation-item">
                    <div className="conversation-avatar">
                      <img src="https://via.placeholder.com/40x40" alt="User" />
                    </div>
                    <div className="conversation-content">
                      <h4>Lisa Chen</h4>
                      <p>Great! Let's arrange the pickup...</p>
                      <span className="message-time">3 hours ago</span>
                    </div>
                  </div>

                  <div className="conversation-item">
                    <div className="conversation-avatar">
                      <img src="https://via.placeholder.com/40x40" alt="User" />
                    </div>
                    <div className="conversation-content">
                      <h4>David Park</h4>
                      <p>The shoes look amazing!</p>
                      <span className="message-time">1 day ago</span>
                    </div>
                  </div>

                  <div className="conversation-item">
                    <div className="conversation-avatar">
                      <img src="https://via.placeholder.com/40x40" alt="User" />
                    </div>
                    <div className="conversation-content">
                      <h4>Anna Martinez</h4>
                      <p>Thank you for the quick response!</p>
                      <span className="message-time">2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages Main Content */}
              <div className="messages-main">
                <div className="chat-header">
                  <div className="chat-user-info">
                    <img src="https://via.placeholder.com/40x40" alt="Emma Wilson" />
                    <div>
                      <h4>Emma Wilson</h4>
                      <span className="user-status">Online</span>
                    </div>
                  </div>
                  <div className="chat-actions">
                    <button className="chat-action-btn">
                      <i className="fas fa-phone"></i>
                    </button>
                    <button className="chat-action-btn">
                      <i className="fas fa-video"></i>
                    </button>
                    <button className="chat-action-btn">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </div>
                </div>

                <div className="chat-messages">
                  <div className="message-date">
                    <span>Today</span>
                  </div>

                  <div className="message received">
                    <div className="message-avatar">
                      <img src="https://via.placeholder.com/30x30" alt="Emma" />
                    </div>
                    <div className="message-content">
                      <div className="message-bubble">
                        Hi! I'm interested in the vintage denim jacket you posted. Is it still available?
                      </div>
                      <div className="message-time">10:30 AM</div>
                    </div>
                  </div>

                  <div className="message sent">
                    <div className="message-content">
                      <div className="message-bubble">
                        Yes, it's still available! It's in great condition and has been well taken care of.
                      </div>
                      <div className="message-time">10:32 AM</div>
                    </div>
                  </div>

                  <div className="message received">
                    <div className="message-avatar">
                      <img src="https://via.placeholder.com/30x30" alt="Emma" />
                    </div>
                    <div className="message-content">
                      <div className="message-bubble">
                        Perfect! Could you tell me more about the fit? I'm usually a size M.
                      </div>
                      <div className="message-time">10:35 AM</div>
                    </div>
                  </div>

                  <div className="message sent">
                    <div className="message-content">
                      <div className="message-bubble">
                        It's a size M and fits true to size. It has a slightly oversized fit which is very trendy right now.
                      </div>
                      <div className="message-time">10:37 AM</div>
                    </div>
                  </div>

                  <div className="message received">
                    <div className="message-avatar">
                      <img src="https://via.placeholder.com/30x30" alt="Emma" />
                    </div>
                    <div className="message-content">
                      <div className="message-bubble">
                        Sounds perfect! How would you like to arrange the exchange?
                      </div>
                      <div className="message-time">10:40 AM</div>
                    </div>
                  </div>

                  <div className="message sent">
                    <div className="message-content">
                      <div className="message-bubble">
                        We can meet at the campus library tomorrow afternoon if that works for you?
                      </div>
                      <div className="message-time">10:42 AM</div>
                    </div>
                  </div>

                  <div className="message received">
                    <div className="message-avatar">
                      <img src="https://via.placeholder.com/30x30" alt="Emma" />
                    </div>
                    <div className="message-content">
                      <div className="message-bubble">
                        That works great! How about 2 PM at the main entrance?
                      </div>
                      <div className="message-time">10:45 AM</div>
                    </div>
                  </div>
                </div>

                <div className="chat-input">
                  <div className="chat-input-container">
                    <button className="attachment-btn">
                      <i className="fas fa-paperclip"></i>
                    </button>
                    <input 
                      type="text" 
                      placeholder="Type a message..."
                      className="message-input"
                    />
                    <button className="emoji-btn">
                      <i className="fas fa-smile"></i>
                    </button>
                    <button className="send-btn">
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
