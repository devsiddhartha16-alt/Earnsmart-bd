
import { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  ChartNoAxesCombined,
  Settings,
  Search,
  Menu,
  X,
  Bot,
  CircleUserRound,
  PlayCircle,
  ChevronRight,
  CheckCircle2,
  Target
} from 'lucide-react';

import {
  Link,
  NavLink,
  Routes,
  Route,
  useParams
} from 'react-router-dom';

import AIChatWidget from './components/AIChatWidget.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';

const courses = [
  {
    id: 'ai-learning',
    title: 'AI দিয়ে অনলাইন কাজ শেখা',
    category: 'Artificial Intelligence',
    description: 'AI tools, prompting এবং নতুন দক্ষতা শেখো।',
    icon: '🤖',
    lessons: 8,
    videoUrl: 'https://www.youtube.com/watch?v=EevUMH7eDpk'
  },
  {
    id: 'website-making',
    title: 'ওয়েবসাইট তৈরি',
    category: 'Web Development',
    description: 'HTML ও CSS দিয়ে ওয়েবসাইট তৈরি শেখো।',
    icon: '💻',
    lessons: 10,
    videoUrl: 'https://www.youtube.com/watch?v=5-PaCEQjOjA'
  },
  {
    id: 'graphics-basics',
    title: 'গ্রাফিক ডিজাইন',
    category: 'Design',
    description: 'Canva দিয়ে পোস্টার, থাম্বনেইল ও ডিজাইন শেখো।',
    icon: '🎨',
    lessons: 7,
    videoUrl: 'https://www.youtube.com/watch?v=MokHdVW4i8c'
  },
  {
    id: 'freelancing-foundation',
    title: 'ফ্রিল্যান্সিংয়ের ভিত্তি',
    category: 'Freelancing',
    description: 'প্রোফাইল, ক্লায়েন্ট ও প্রথম কাজের প্রস্তুতি শেখো।',
    icon: '🌐',
    lessons: 6,
    videoUrl: 'https://www.youtube.com/watch?v=sX5sD54Aj2o'
  }
];

const topics = [
  'পরিচিতি ও প্রস্তুতি',
  'প্রয়োজনীয় টুলস',
  'মূল বিষয় শেখা',
  'হাতে-কলমে অনুশীলন',
  'বাস্তব উদাহরণ',
  'নিজের প্রজেক্ট',
  'দক্ষতা উন্নয়ন',
  'শেষ মূল্যায়ন',
  'অনুশীলন',
  'পর্যালোচনা'
];

function readList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function Sidebar({ close }) {
  const items = [
    ['/', 'Dashboard', LayoutDashboard],
    ['/courses', 'সব কোর্স', BookOpen],
    ['/planning', 'Study Plan', ChartNoAxesCombined],
    ['/settings', 'Profile & Settings', Settings]
  ];

  return (
    <aside className="sidebar">
      <Link to="/" className="brand" onClick={close}>
        <span className="brand-icon">E</span>
        <span>
          EarnSmart<span className="brand-accent">-BD</span>
        </span>
      </Link>

      <p className="nav-heading">LEARNING MENU</p>

      <nav className="nav-links">
        {items.map(([to, label, Icon]) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={close}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <Icon size={19} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-tip">
          <Bot size={23} />
          <strong>Keep learning!</strong>
          <p>প্রতিদিন অল্প অল্প করে নতুন কিছু শেখো।</p>
        </div>
        <p className="copyright">EarnSmart-BD</p>
      </div>
    </aside>
  );
}

function CourseCard({ course }) {
  const completed = readList('earnsmart-completed');

  const count = completed.filter(
    item => item.startsWith(`${course.id}-`)
  ).length;

  const progress = Math.min(
    100,
    Math.round((count / course.lessons) * 100)
  );

  return (
    <article className="course-card">
      <div className="course-art">
        <span>{course.icon}</span>
        <span className="course-category">{course.category}</span>
      </div>

      <div className="course-info">
        <h3>{course.title}</h3>
        <p>{course.description}</p>

        <div className="course-meta">
          <span>
            <PlayCircle size={15} /> {course.lessons} lessons
          </span>
          <span>{progress}%</span>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <Link
          className="course-button"
          to={`/course/${course.id}`}
        >
          কোর্স দেখো <ChevronRight size={17} />
        </Link>
      </div>
    </article>
  );
}

function Dashboard() {
  const [completed, setCompleted] = useState(
    () => readList('earnsmart-completed')
  );

  const totalLessons = courses.reduce(
    (sum, course) => sum + course.lessons,
    0
  );

  const progress = Math.min(
    100,
    Math.round((completed.length / totalLessons) * 100)
  );

  return (
    <div className="page-content">
      <div className="welcome-banner">
        <div>
          <span className="eyebrow">YOUR LEARNING JOURNEY</span>
          <h1>শেখা শুরু করো আজ থেকেই! 👋</h1>
          <p>
            দক্ষতা শেখো, অনুশীলন করো এবং নিজের অগ্রগতি দেখো।
          </p>
          <Link to="/courses" className="primary-button">
            কোর্স শুরু করো <ChevronRight size={18} />
          </Link>
        </div>

        <div className="welcome-art">🚀</div>
      </div>

      <div className="section-heading">
        <div>
          <h2>তোমার অগ্রগতি</h2>
          <p>তুমি এখন পর্যন্ত যা শিখেছ</p>
        </div>

        <button
          className="icon-button"
          onClick={() => setCompleted(readList('earnsmart-completed'))}
          title="Refresh progress"
        >
          <ChartNoAxesCombined size={19} />
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon purple"><BookOpen /></span>
          <p>মোট কোর্স</p>
          <h3>{courses.length}</h3>
        </div>

        <div className="stat-card">
          <span className="stat-icon green"><PlayCircle /></span>
          <p>সম্পন্ন লেসন</p>
          <h3>{completed.length}</h3>
        </div>

        <div className="stat-card">
          <span className="stat-icon orange">
            <ChartNoAxesCombined />
          </span>
          <p>সামগ্রিক অগ্রগতি</p>
          <h3>{progress}%</h3>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <h2>জনপ্রিয় কোর্স</h2>
          <p>তোমার পছন্দের বিষয়টি বেছে নাও</p>
        </div>

        <Link className="text-link" to="/courses">
          সব কোর্স দেখো →
        </Link>
      </div>

      <div className="course-grid">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

function CourseList() {
  const [search, setSearch] = useState('');

  const filtered = courses.filter(course =>
    `${course.title} ${course.category} ${course.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page-content">
      <div className="page-title">
        <span className="eyebrow">EXPLORE & LEARN</span>
        <h1>সব কোর্স</h1>
        <p>নিজের পছন্দ অনুযায়ী শেখা শুরু করো।</p>
      </div>

      <label className="search-box">
        <Search size={20} />
        <input
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="কোর্স খুঁজুন..."
        />
      </label>

      <div className="course-grid">
        {filtered.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          কোনো কোর্স পাওয়া যায়নি। অন্য শব্দ দিয়ে খুঁজো।
        </div>
      )}
    </div>
  );
}

function CourseDetail() {
  const { id } = useParams();
  const course = courses.find(item => item.id === id);

  const [completed, setCompleted] = useState(
    () => readList('earnsmart-completed')
  );

  if (!course) {
    return (
      <div className="page-content">
        <h1>কোর্স পাওয়া যায়নি</h1>
        <Link to="/courses" className="text-link">
          সব কোর্সে ফিরে যাও
        </Link>
      </div>
    );
  }

  const lessons = Array.from(
    { length: course.lessons },
    (_, index) => ({
      id: `${course.id}-${index + 1}`,
      title: `${index + 1}. ${topics[index % topics.length]}`
    })
  );

  function toggleLesson(lessonId) {
    const next = completed.includes(lessonId)
      ? completed.filter(item => item !== lessonId)
      : [...completed, lessonId];

    localStorage.setItem(
      'earnsmart-completed',
      JSON.stringify(next)
    );

    setCompleted(next);
  }

  const done = lessons.filter(
    lesson => completed.includes(lesson.id)
  ).length;

  const progress = Math.round(
    (done / lessons.length) * 100
  );

  return (
    <div className="page-content">
      <Link to="/courses" className="text-link">
        ← সব কোর্স
      </Link>

      <div className="detail-banner">
        <span className="detail-emoji">{course.icon}</span>
        <span className="eyebrow">{course.category}</span>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <p>{done} / {lessons.length} লেসন সম্পন্ন · {progress}%</p>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="section-heading">
        <div>
          <h2>ভিডিও লেসন</h2>
          <p>ভিডিও দেখে তারপর অনুশীলন করো।</p>
        </div>
      </div>

      <VideoPlayer
        title={`${course.title} — ভিডিও`}
        videoUrl={course.videoUrl}
      />

      <div className="section-heading">
        <div>
          <h2>কোর্সের লেসন</h2>
          <p>একটি লেসন শেষ হলে টিক চিহ্ন দাও।</p>
        </div>
      </div>

      <div className="lesson-list">
        {lessons.map(lesson => (
          <label className="lesson-row" key={lesson.id}>
            <input
              type="checkbox"
              checked={completed.includes(lesson.id)}
              onChange={() => toggleLesson(lesson.id)}
            />

            <span className="lesson-play">
              {completed.includes(lesson.id)
                ? <CheckCircle2 size={21} />
                : <PlayCircle size={21} />}
            </span>

            <span className="lesson-title">{lesson.title}</span>

            <span className="lesson-status">
              {completed.includes(lesson.id)
                ? 'সম্পন্ন ✓'
                : 'শুরু করো'}
            </span>
          </label>
        ))}
      </div>

      {progress === 100 && (
        <div className="notice">
          <CheckCircle2 size={21} />
          <div>
            <strong>অভিনন্দন! 🎉</strong>
            <p>তুমি এই কোর্সের সব লেসন সম্পন্ন করেছ।</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Planning() {
  const tasks = [
    'আজকের শেখার লক্ষ্য নির্ধারণ',
    'একটি লেসন দেখা বা পড়া',
    'নিজে হাতে অনুশীলন করা',
    'শেখা বিষয়গুলো পুনরাবৃত্তি করা'
  ];

  const [checked, setChecked] = useState(
    () => readList('earnsmart-plan')
  );

  function toggleTask(index) {
    const next = checked.includes(index)
      ? checked.filter(item => item !== index)
      : [...checked, index];

    setChecked(next);

    localStorage.setItem(
      'earnsmart-plan',
      JSON.stringify(next)
    );
  }

  return (
    <div className="page-content">
      <div className="page-title">
        <span className="eyebrow">DAILY ROUTINE</span>
        <h1>তোমার Study Plan</h1>
        <p>প্রতিদিনের শেখার কাজগুলো সম্পন্ন করো।</p>
      </div>

      <div className="task-list">
        {tasks.map((task, index) => (
          <label className="task-row" key={task}>
            <input
              type="checkbox"
              checked={checked.includes(index)}
              onChange={() => toggleTask(index)}
            />
            <span>{task}</span>
          </label>
        ))}
      </div>

      <p className="muted-text">
        {checked.length} / {tasks.length} কাজ সম্পন্ন
      </p>
    </div>
  );
}

function SettingsPage() {
  const [name, setName] = useState(
    () => localStorage.getItem('earnsmart-name') || 'Learner'
  );

  const [saved, setSaved] = useState(false);

  function save(event) {
    event.preventDefault();

    localStorage.setItem('earnsmart-name', name.trim());
    setSaved(true);
  }

  return (
    <div className="page-content">
      <div className="page-title">
        <span className="eyebrow">YOUR ACCOUNT</span>
        <h1>Profile & Settings</h1>
        <p>নিজের প্রোফাইলের নাম পরিবর্তন করো।</p>
      </div>

      <form className="settings-form" onSubmit={save}>
        <CircleUserRound size={42} />

        <label htmlFor="profile-name">তোমার নাম</label>

        <input
          id="profile-name"
          value={name}
          onChange={event => {
            setName(event.target.value);
            setSaved(false);
          }}
          required
          maxLength={50}
        />

        <button className="primary-button" type="submit">
          Save Settings
        </button>

        {saved && (
          <p className="success-text">
            তোমার নাম সেভ হয়েছে।
          </p>
        )}
      </form>
    </div>
  );
}

function NotFound() {
  return (
    <div className="page-content">
      <h1>পেজটি পাওয়া যায়নি</h1>
      <Link to="/" className="text-link">
        Dashboard-এ ফিরে যাও
      </Link>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileName =
    localStorage.getItem('earnsmart-name') || 'My Profile';

  return (
    <div className="app-shell">
      {menuOpen && (
        <button
          className="mobile-overlay"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className={`sidebar-wrap ${menuOpen ? 'sidebar-open' : ''}`}>
        <Sidebar close={() => setMenuOpen(false)} />
      </div>

      <main className="main-area">
        <header className="topbar">
          <button
            className="icon-button mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <div className="breadcrumb">
            EarnSmart-BD <span>/</span> Learning Hub
          </div>

          <div className="topbar-actions">
            <button
              className="profile-button"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <CircleUserRound size={22} />
              <span>{profileName}</span>
            </button>

            {profileOpen && (
              <div className="profile-menu">
                <Link
                  to="/settings"
                  onClick={() => setProfileOpen(false)}
                >
                  <Settings size={16} /> Profile & Settings
                </Link>

                <Link
                  to="/planning"
                  onClick={() => setProfileOpen(false)}
                >
                  <Target size={16} /> Study Plan
                </Link>
              </div>
            )}
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="app-footer">
          <span>© {new Date().getFullYear()} EarnSmart-BD</span>
          <span>Learn skills. Build your future.</span>
        </footer>
      </main>

      <AIChatWidget />
    </div>
  );
}
