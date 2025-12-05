import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      sender: 'admin',
      time: '10:00 AM',
    },
    {
      id: '2',
      text: 'I need assistance with my document.',
      sender: 'user',
      time: '10:02 AM',
    },
  ]);

  const [input, setInput] = useState('');
  const flatListRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Fake admin reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Thanks! I'm checking this for you.",
          sender: 'admin',
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    }, 1000);
  };

  const renderItem = ({ item }) => {
    const isUser = item.sender === 'user';

    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.adminMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Input Bar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor={'gray'}
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  messageContainer: {
    maxWidth: '75%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#0084ff',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  adminMessage: {
    backgroundColor: '#e1e1e1',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 15,
    color: '#000',
  },
  timeText: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'right',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 45,
    backgroundColor: '#f1f1f1',
    color: '#000',
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  sendBtn: {
    backgroundColor: '#0084ff',
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
  },
});
