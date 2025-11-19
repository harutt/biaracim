import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

function Inbox() {
  const { user } = useAuth()
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messageText, setMessageText] = useState('')

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      userName: 'Mehmet Yılmaz',
      userAvatar: 'https://ui-avatars.com/api/?name=Mehmet+Yilmaz&background=6366f1&color=fff',
      carName: 'BMW 5 Series 2021',
      carImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=100',
      lastMessage: 'Teşekkür ederim, görüşmek üzere!',
      timestamp: '2 saat önce',
      unread: 0,
      isHost: true,
      messages: [
        {
          id: 1,
          sender: 'Mehmet Yılmaz',
          text: 'Merhaba! BMW ile ilgilendiğiniz için teşekkür ederim.',
          timestamp: '10:30',
          isOwn: false
        },
        {
          id: 2,
          sender: 'Sen',
          text: 'Merhaba, araç müsait mi 15-18 Aralık tarihleri için?',
          timestamp: '10:35',
          isOwn: true
        },
        {
          id: 3,
          sender: 'Mehmet Yılmaz',
          text: 'Evet müsait. Havalimanı transferi de gerekli mi?',
          timestamp: '10:40',
          isOwn: false
        },
        {
          id: 4,
          sender: 'Sen',
          text: 'Hayır, kendim alacağım. Rezervasyon yaptım, görüşürüz!',
          timestamp: '10:45',
          isOwn: true
        },
        {
          id: 5,
          sender: 'Mehmet Yılmaz',
          text: 'Teşekkür ederim, görüşmek üzere!',
          timestamp: '10:46',
          isOwn: false
        }
      ]
    },
    {
      id: 2,
      userName: 'Ayşe Demir',
      userAvatar: 'https://ui-avatars.com/api/?name=Ayse+Demir&background=ec4899&color=fff',
      carName: 'Mercedes-Benz C-Class 2022',
      carImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=100',
      lastMessage: 'Ek sigorta dahil mi?',
      timestamp: '1 gün önce',
      unread: 2,
      isHost: true,
      messages: [
        {
          id: 1,
          sender: 'Ayşe Demir',
          text: 'Merhaba! Mercedes hakkında bilgi almak istiyorum.',
          timestamp: 'Dün 15:20',
          isOwn: false
        },
        {
          id: 2,
          sender: 'Sen',
          text: 'Merhaba, tabii. Nasıl yardımcı olabilirim?',
          timestamp: 'Dün 15:25',
          isOwn: true
        },
        {
          id: 3,
          sender: 'Ayşe Demir',
          text: 'Ek sigorta dahil mi?',
          timestamp: 'Dün 15:30',
          isOwn: false
        }
      ]
    },
    {
      id: 3,
      userName: 'BiAracım Destek',
      userAvatar: 'https://ui-avatars.com/api/?name=Support&background=10b981&color=fff',
      carName: 'Sistem Bildirimi',
      carImage: null,
      lastMessage: 'Rezervasyonunuz onaylandı',
      timestamp: '3 gün önce',
      unread: 0,
      isHost: false,
      isSupport: true,
      messages: [
        {
          id: 1,
          sender: 'BiAracım Destek',
          text: 'Merhaba! BMW 5 Series için yaptığınız rezervasyon onaylandı. Rezervasyon numaranız: BIA1732012345',
          timestamp: '3 gün önce 14:00',
          isOwn: false
        },
        {
          id: 2,
          sender: 'BiAracım Destek',
          text: 'Teslim alma tarihiniz: 15/12/2025 - 10:00. Lütfen geçerli bir kimlik ve ehliyet getirmeyi unutmayın.',
          timestamp: '3 gün önce 14:00',
          isOwn: false
        }
      ]
    },
    {
      id: 4,
      userName: 'Can Öztürk',
      userAvatar: 'https://ui-avatars.com/api/?name=Can+Ozturk&background=f59e0b&color=fff',
      carName: 'Audi A4 2020',
      carImage: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100',
      lastMessage: 'Harika, teşekkürler!',
      timestamp: '1 hafta önce',
      unread: 0,
      isHost: true,
      messages: [
        {
          id: 1,
          sender: 'Can Öztürk',
          text: 'Merhaba, aracınız çok temiz ve bakımlıydı!',
          timestamp: '1 hafta önce',
          isOwn: false
        },
        {
          id: 2,
          sender: 'Sen',
          text: 'Teşekkür ederim! Keyifli bir yolculuk geçirdiğinize sevindim.',
          timestamp: '1 hafta önce',
          isOwn: true
        },
        {
          id: 3,
          sender: 'Can Öztürk',
          text: 'Harika, teşekkürler!',
          timestamp: '1 hafta önce',
          isOwn: false
        }
      ]
    }
  ]

  const handleSendMessage = () => {
    if (!messageText.trim()) return

    // In a real app, this would send the message to an API
    console.log('Sending message:', messageText)
    setMessageText('')
  }

  const selectedConv = conversations.find(c => c.id === selectedConversation)

  return (
    <div className="flex h-[calc(100vh-73px)] bg-white">
      {/* Conversations List - Left Sidebar */}
      <div className="w-full md:w-96 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Mesajlar</h1>
          <p className="text-sm text-gray-600 mt-1">
            {conversations.filter(c => c.unread > 0).length} okunmamış mesaj
          </p>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left ${
                selectedConversation === conv.id ? 'bg-purple-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={conv.userAvatar}
                    alt={conv.userName}
                    className="w-12 h-12 rounded-full"
                  />
                  {conv.unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{conv.unread}</span>
                    </div>
                  )}
                </div>

                {/* Message Preview */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold text-sm truncate ${conv.unread > 0 ? 'text-gray-900' : 'text-gray-700'}`}>
                      {conv.userName}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                      {conv.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    {conv.carImage && (
                      <img
                        src={conv.carImage}
                        alt={conv.carName}
                        className="w-6 h-6 rounded object-cover"
                      />
                    )}
                    {conv.isSupport && (
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="text-xs text-gray-500 truncate">
                      {conv.carName}
                    </span>
                  </div>
                  <p className={`text-sm truncate ${conv.unread > 0 ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Message Thread - Right Side */}
      <div className="hidden md:flex flex-1 flex-col">
        {selectedConv ? (
          <>
            {/* Conversation Header */}
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-4">
                <img
                  src={selectedConv.userAvatar}
                  alt={selectedConv.userName}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900">{selectedConv.userName}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {selectedConv.carImage && (
                      <img
                        src={selectedConv.carImage}
                        alt={selectedConv.carName}
                        className="w-5 h-5 rounded object-cover"
                      />
                    )}
                    <span>{selectedConv.carName}</span>
                  </div>
                </div>
                {selectedConv.isHost && !selectedConv.isSupport && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Ev Sahibi
                  </span>
                )}
                {selectedConv.isSupport && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Destek
                  </span>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              <div className="space-y-4">
                {selectedConv.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.isOwn
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-gray-900 border border-gray-200'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <div className={`text-xs text-gray-500 mt-1 px-2 ${message.isOwn ? 'text-right' : 'text-left'}`}>
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            {!selectedConv.isSupport && (
              <div className="p-6 border-t border-gray-200 bg-white">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Mesajınızı yazın..."
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Enter tuşu ile gönder, Shift+Enter ile yeni satır
                </p>
              </div>
            )}
          </>
        ) : (
          /* No Conversation Selected */
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Mesajlarınız
              </h3>
              <p className="text-gray-600">
                Bir konuşma seçin ve mesajlaşmaya başlayın
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile: Show message when no conversation selected */}
      {!selectedConv && (
        <div className="flex-1 md:hidden flex items-center justify-center bg-gray-50">
          <p className="text-gray-600 text-center px-4">
            Mesajlaşmak için bir konuşma seçin
          </p>
        </div>
      )}
    </div>
  )
}

export default Inbox
