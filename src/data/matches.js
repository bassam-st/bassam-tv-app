export const leagues = [
  { id: 'champions', name: 'دوري أبطال أوروبا', icon: '🏆' },
  { id: 'premier', name: 'الدوري الإنجليزي الممتاز', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'laliga', name: 'الدوري الإسباني', icon: '🇪🇸' },
  { id: 'bundesliga', name: 'الدوري الألماني', icon: '🇩🇪' },
  { id: 'seriea', name: 'الدوري الإيطالي', icon: '🇮🇹' },
  { id: 'ligue1', name: 'الدوري الفرنسي', icon: '🇫🇷' },
  { id: 'arab', name: 'الدوريات العربية', icon: '⭐' },
]

export const matches = [
  {
    id: '1',
    league: 'دوري أبطال أوروبا',
    leagueId: 'champions',
    team1: {
      name: 'ريال مدريد',
      logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
      score: 2
    },
    team2: {
      name: 'مانشستر سيتي',
      logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
      score: 1
    },
    status: 'live',
    minute: 67,
    time: '22:00',
    channels: ['beIN Sports 1', 'beIN Sports HD', 'استديو أون'],
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  },
  {
    id: '2',
    league: 'الدوري الإنجليزي',
    leagueId: 'premier',
    team1: {
      name: 'ليفربول',
      logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
      score: 3
    },
    team2: {
      name: 'تشيلسي',
      logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
      score: 2
    },
    status: 'live',
    minute: 45,
    time: '20:00',
    channels: ['beIN Sports 2', 'beIN Sports Premium'],
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  },
  {
    id: '3',
    league: 'الدوري الإسباني',
    leagueId: 'laliga',
    team1: {
      name: 'برشلونة',
      logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
      score: 0
    },
    team2: {
      name: 'أتلتيكو مدريد',
      logo: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg',
      score: 0
    },
    status: 'upcoming',
    minute: 0,
    time: '23:00',
    channels: ['beIN Sports 3', 'beIN Sports Max 1'],
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  },
  {
    id: '4',
    league: 'الدوري الألماني',
    leagueId: 'bundesliga',
    team1: {
      name: 'بايرن ميونخ',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
      score: 0
    },
    team2: {
      name: 'دورتموند',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
      score: 0
    },
    status: 'upcoming',
    minute: 0,
    time: '21:30',
    channels: ['beIN Sports 4', 'SSC الرياضية'],
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  },
  {
    id: '5',
    league: 'الدوري الإيطالي',
    leagueId: 'seriea',
    team1: {
      name: 'يوفنتوس',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon.svg',
      score: 1
    },
    team2: {
      name: 'إنتر ميلان',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg',
      score: 1
    },
    status: 'live',
    minute: 78,
    time: '19:45',
    channels: ['beIN Sports 5', 'beIN Sports Max 2'],
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  },
  {
    id: '6',
    league: 'الدوري الفرنسي',
    leagueId: 'ligue1',
    team1: {
      name: 'باريس سان جيرمان',
      logo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
      score: 0
    },
    team2: {
      name: 'مارسيليا',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Olympique_Marseille_logo.svg',
      score: 0
    },
    status: 'upcoming',
    minute: 0,
    time: '22:45',
    channels: ['beIN Sports 6', 'استديو أون 2'],
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  },
  {
    id: '7',
    league: 'الدوري السعودي الدرجة الأولى',
    leagueId: 'arab',
    team1: {
      name: 'النصر',
      logo: 'https://upload.wikimedia.org/wikipedia/ar/c/c2/AlNassr_FC.png',
      score: 2
    },
    team2: {
      name: 'الهلال',
      logo: 'https://upload.wikimedia.org/wikipedia/ar/c/cc/AlHilal_FC.png',
      score: 1
    },
    status: 'live',
    minute: 30,
    time: '20:00',
    channels: ['SSC الرياضية', 'الرياضية 4K', 'Thimanya', 'شاهد'],
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  }
]

export const getMatchById = (id) => matches.find(m => m.id === id)

export const getMatchesByLeague = (leagueId) => matches.filter(m => m.leagueId === leagueId)

export const getLiveMatches = () => matches.filter(m => m.status === 'live')

export const getUpcomingMatches = () => matches.filter(m => m.status === 'upcoming')
