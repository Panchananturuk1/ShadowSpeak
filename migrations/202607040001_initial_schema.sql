CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(120) NOT NULL,
  interface_language VARCHAR(10) NOT NULL,
  target_language VARCHAR(10) NOT NULL,
  current_level VARCHAR(32) NOT NULL DEFAULT 'beginner',
  streak_days INTEGER NOT NULL DEFAULT 0,
  weekly_goal_minutes INTEGER NOT NULL DEFAULT 150,
  focus_area VARCHAR(32) NOT NULL DEFAULT 'balanced',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE languages (
  code VARCHAR(10) PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  native_name VARCHAR(80) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE courses (
  id UUID PRIMARY KEY,
  language_code VARCHAR(10) NOT NULL REFERENCES languages(code),
  title VARCHAR(200) NOT NULL,
  level VARCHAR(32) NOT NULL,
  duration VARCHAR(40) NOT NULL,
  headline TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE lessons (
  id UUID PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  summary TEXT NOT NULL,
  focus VARCHAR(32) NOT NULL,
  length_minutes INTEGER NOT NULL
);

CREATE TABLE lesson_attempts (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  module_type VARCHAR(32) NOT NULL,
  score INTEGER NOT NULL,
  duration_seconds INTEGER NOT NULL,
  audio_sample_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_courses_language_level ON courses(language_code, level);
CREATE INDEX idx_lesson_attempts_user_created_at ON lesson_attempts(user_id, created_at DESC);
