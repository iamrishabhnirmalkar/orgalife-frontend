export interface AnnouncementBarData {
  texts: string[];
  backgroundColor: string;
  textColor: string;
  speed: number;
  direction: 'leftToRight' | 'rightToLeft';
  pauseOnHover: boolean;
  fontSize: string;
  fontWeight: string;
  padding: string;
  itemSpacing: string;
}

const announcementConfig: AnnouncementBarData = {
  texts: [
    '🔥 Mega Sale: Flat 50% Off Today Only!',
    '🚚 Free shipping on orders above ₹999',
    '📢 Follow us on Instagram @yourbrand',
  ],
  backgroundColor: '#1a202c', // dark navy
  textColor: '#ffffff', // white
  speed: 40,
  direction: 'rightToLeft',
  pauseOnHover: true,
  fontSize: 'text-base',
  fontWeight: 'font-semibold',
  padding: 'py-3 px-6',
  itemSpacing: 'mx-10',
};

export default announcementConfig;
