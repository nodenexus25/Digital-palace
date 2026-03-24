// ElevenLabs API Service for Voice Synthesis

interface ElevenLabsVoice {
 voice_id: string;
 name: string;
 category: string;
}

interface ElevenLabsConfig {
 apiKey: string;
 baseUrl: string;
 voices: {
 female: ElevenLabsVoice;
 male: ElevenLabsVoice;
 };
}

class ElevenLabsService {
 private config: ElevenLabsConfig;
 private currentAudio: HTMLAudioElement | null = null;

 constructor() {
 this.config = {
 apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || '',
 baseUrl: 'https://api.elevenlabs.io/v1',
 voices: {
 female: {
 voice_id: process.env.NEXT_PUBLIC_KANIKA_VOICE_ID || 'kanika_voice_id',
 name: 'Kanika',
 category: 'female'
 },
 male: {
 voice_id: process.env.NEXT_PUBLIC_NIRAJ_VOICE_ID || 'niraj_voice_id',
 name: 'Niraj',
 category: 'male'
 }
 }
 };
 }

 private getVoiceForContent(text: string): ElevenLabsVoice {
 // Determine voice based on content context
 // For stories about queens, female characters, use female voice
 const femaleKeywords = ['रानी', 'राजकुमारी', 'पद्मिनी', 'संयोगिता', 'माता', 'देवी'];
 const hasFemaleContext = femaleKeywords.some(keyword => text.includes(keyword));
 
 if (hasFemaleContext) {
 return this.config.voices.female;
 }
 
 // Default to male voice for general narration
 return this.config.voices.male;
 }

 async synthesizeSpeech(text: string, voiceType?: 'male' | 'female'): Promise<ArrayBuffer> {
 if (!this.config.apiKey) {
 throw new Error('ElevenLabs API key not configured');
 }

 // Determine which voice to use based on content or explicit type
 const voice = voiceType 
 ? this.config.voices[voiceType] 
 : this.getVoiceForContent(text);

 // Use the configured voice ID directly
 const voiceIdToUse = voice.voice_id;

 try {
 const response = await fetch(`${this.config.baseUrl}/text-to-speech/${voiceIdToUse}`, {
 method: 'POST',
 headers: {
 'Accept': 'audio/mpeg',
 'Content-Type': 'application/json',
 'xi-api-key': this.config.apiKey
 },
 body: JSON.stringify({
 text: text.substring(0, 500), // Shorter text for reliability
 model_id: 'eleven_multilingual_v2',
 voice_settings: {
 stability: 0.6,
 similarity_boost: 0.7,
 style: 0.1,
 use_speaker_boost: false
 }
 })
 });

 if (!response.ok) {
 const errorText = await response.text();
 console.error(`ElevenLabs API error for ${voice.name}:`, response.status, errorText);
 throw new Error(`ElevenLabs API error: ${response.status}`);
 }

 return await response.arrayBuffer();
 } catch (error) {
 console.error(`Failed to synthesize speech with ${voice.name}:`, error);
 throw error;
 }
 }

 async playAudio(audioBuffer: ArrayBuffer): Promise<void> {
 return new Promise((resolve, reject) => {
 try {
 // Stop any currently playing audio
 this.stopCurrentAudio();
 
 // Create blob from audio buffer
 const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });
 const audioUrl = URL.createObjectURL(audioBlob);
 
 // Create and configure audio element for immediate playback
 this.currentAudio = new Audio();
 this.currentAudio.preload = 'none'; // Don't preload to start faster
 this.currentAudio.src = audioUrl;
 
 // Set up event handlers
 this.currentAudio.oncanplaythrough = () => {
 // Audio is ready to play through without buffering
 if (this.currentAudio) {
 this.currentAudio.play().catch(reject);
 }
 };
 
 this.currentAudio.onended = () => {
 URL.revokeObjectURL(audioUrl);
 this.currentAudio = null;
 resolve();
 };
 
 this.currentAudio.onerror = () => {
 URL.revokeObjectURL(audioUrl);
 this.currentAudio = null;
 reject(new Error('Audio playback failed'));
 };
 
 // Load the audio immediately
 this.currentAudio.load();
 
 // Try to play immediately if possible
 this.currentAudio.play().catch(() => {
 // If immediate play fails, wait for canplaythrough event
 });
 
 } catch (error) {
 reject(error);
 }
 });
 }
 
 private stopCurrentAudio(): void {
 if (this.currentAudio) {
 this.currentAudio.pause();
 this.currentAudio.currentTime = 0;
 this.currentAudio = null;
 }
 }

 async speakText(text: string, voiceType?: 'male' | 'female'): Promise<void> {
 try {
 const audioBuffer = await this.synthesizeSpeech(text, voiceType);
 await this.playAudio(audioBuffer);
 } catch (error) {
 console.error('ElevenLabs speech synthesis failed:', error);
 // Always fallback to browser speech synthesis on any error
 await this.fallbackToWebSpeech(text);
 }
 }

 private fallbackToWebSpeech(text: string): Promise<void> {
 return new Promise((resolve) => {
 if ('speechSynthesis' in window) {
 // Cancel any ongoing speech
 speechSynthesis.cancel();
 
 const utterance = new SpeechSynthesisUtterance(text);
 utterance.lang = 'hi-IN';
 utterance.rate = 0.8;
 utterance.pitch = 1.0;
 utterance.volume = 1.0;
 
 utterance.onend = () => {
 resolve();
 };
 utterance.onerror = () => {
 console.error('Browser speech error occurred');
 // Simple English fallback
 const englishUtterance = new SpeechSynthesisUtterance(text);
 englishUtterance.lang = 'en-US';
 englishUtterance.onend = () => resolve();
 englishUtterance.onerror = () => resolve();
 speechSynthesis.speak(englishUtterance);
 };

 speechSynthesis.speak(utterance);
 } else {
 console.error('Speech synthesis not supported in this browser');
 resolve();
 }
 });
 }

 stopSpeech(): void {
 // Stop ElevenLabs audio playback
 this.stopCurrentAudio();
 
 // Stop browser speech synthesis as fallback
 if ('speechSynthesis' in window) {
 speechSynthesis.cancel();
 }
 }

 isApiConfigured(): boolean {
 return !!this.config.apiKey;
 }
}

export const elevenLabsService = new ElevenLabsService();
export default ElevenLabsService;
