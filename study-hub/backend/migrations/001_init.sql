-- Study Hub v1 — MySQL / MariaDB
-- Portable subset: UUID as CHAR(36), JSON as TEXT, UTC timestamps as DATETIME(3)

CREATE TABLE IF NOT EXISTS schema_migrations (
  id VARCHAR(64) PRIMARY KEY,
  applied_at DATETIME(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
  id CHAR(36) PRIMARY KEY,
  code VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  created_at DATETIME(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS permissions (
  id CHAR(36) PRIMARY KEY,
  code VARCHAR(120) NOT NULL UNIQUE,
  description VARCHAR(255) NOT NULL,
  created_at DATETIME(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id CHAR(36) NOT NULL,
  permission_id CHAR(36) NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  CONSTRAINT fk_rp_role FOREIGN KEY (role_id) REFERENCES roles(id),
  CONSTRAINT fk_rp_perm FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(120) NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME(3) NOT NULL,
  updated_at DATETIME(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_profiles (
  user_id CHAR(36) PRIMARY KEY,
  preferred_language VARCHAR(8) NULL,
  birth_year INT NULL,
  notes TEXT NULL,
  CONSTRAINT fk_profile_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_roles (
  user_id CHAR(36) NOT NULL,
  role_id CHAR(36) NOT NULL,
  PRIMARY KEY (user_id, role_id),
  CONSTRAINT fk_ur_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_ur_role FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS sessions (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  token_hash CHAR(64) NOT NULL UNIQUE,
  expires_at DATETIME(3) NOT NULL,
  created_at DATETIME(3) NOT NULL,
  revoked_at DATETIME(3) NULL,
  CONSTRAINT fk_session_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);

CREATE TABLE IF NOT EXISTS educational_stages (
  id CHAR(36) PRIMARY KEY,
  code VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
  id CHAR(36) PRIMARY KEY,
  stage_id CHAR(36) NOT NULL,
  code VARCHAR(64) NOT NULL,
  name VARCHAR(120) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME(3) NOT NULL,
  UNIQUE KEY uq_course_stage_code (stage_id, code),
  CONSTRAINT fk_course_stage FOREIGN KEY (stage_id) REFERENCES educational_stages(id)
);

CREATE TABLE IF NOT EXISTS subjects (
  id CHAR(36) PRIMARY KEY,
  code VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  icon VARCHAR(32) NULL,
  category VARCHAR(64) NULL,
  language VARCHAR(8) NOT NULL DEFAULT 'es',
  drive_url TEXT NULL,
  description TEXT NULL,
  created_at DATETIME(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS course_subjects (
  course_id CHAR(36) NOT NULL,
  subject_id CHAR(36) NOT NULL,
  PRIMARY KEY (course_id, subject_id),
  CONSTRAINT fk_cs_course FOREIGN KEY (course_id) REFERENCES courses(id),
  CONSTRAINT fk_cs_subject FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

CREATE TABLE IF NOT EXISTS topics (
  id CHAR(36) PRIMARY KEY,
  subject_id CHAR(36) NOT NULL,
  code VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  short_title VARCHAR(120) NOT NULL,
  description TEXT NULL,
  language VARCHAR(8) NOT NULL DEFAULT 'es',
  difficulty VARCHAR(32) NULL,
  estimated_minutes INT NULL,
  recommended_age_min INT NULL,
  recommended_age_max INT NULL,
  vue_module VARCHAR(120) NULL,
  legacy_path VARCHAR(255) NULL,
  created_at DATETIME(3) NOT NULL,
  UNIQUE KEY uq_topic_subject_code (subject_id, code),
  CONSTRAINT fk_topic_subject FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

CREATE TABLE IF NOT EXISTS topic_subjects (
  topic_id CHAR(36) NOT NULL,
  subject_id CHAR(36) NOT NULL,
  PRIMARY KEY (topic_id, subject_id),
  CONSTRAINT fk_ts_topic FOREIGN KEY (topic_id) REFERENCES topics(id),
  CONSTRAINT fk_ts_subject FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

CREATE TABLE IF NOT EXISTS activities (
  id CHAR(36) PRIMARY KEY,
  topic_id CHAR(36) NOT NULL,
  code VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  activity_type VARCHAR(64) NOT NULL,
  created_at DATETIME(3) NOT NULL,
  UNIQUE KEY uq_activity_topic_code (topic_id, code),
  CONSTRAINT fk_activity_topic FOREIGN KEY (topic_id) REFERENCES topics(id)
);

CREATE TABLE IF NOT EXISTS activity_versions (
  id CHAR(36) PRIMARY KEY,
  activity_id CHAR(36) NOT NULL,
  version INT NOT NULL,
  content_json LONGTEXT NOT NULL,
  is_published TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME(3) NOT NULL,
  UNIQUE KEY uq_activity_version (activity_id, version),
  CONSTRAINT fk_av_activity FOREIGN KEY (activity_id) REFERENCES activities(id)
);

CREATE TABLE IF NOT EXISTS exercises (
  id CHAR(36) PRIMARY KEY,
  activity_id CHAR(36) NULL,
  topic_id CHAR(36) NOT NULL,
  code VARCHAR(64) NOT NULL,
  exercise_type VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  created_at DATETIME(3) NOT NULL,
  UNIQUE KEY uq_exercise_topic_code (topic_id, code),
  CONSTRAINT fk_ex_topic FOREIGN KEY (topic_id) REFERENCES topics(id),
  CONSTRAINT fk_ex_activity FOREIGN KEY (activity_id) REFERENCES activities(id)
);

CREATE TABLE IF NOT EXISTS exercise_versions (
  id CHAR(36) PRIMARY KEY,
  exercise_id CHAR(36) NOT NULL,
  version INT NOT NULL,
  content_json LONGTEXT NOT NULL,
  grading_json LONGTEXT NULL,
  max_score DECIMAL(10,2) NOT NULL DEFAULT 10,
  is_published TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME(3) NOT NULL,
  UNIQUE KEY uq_exercise_version (exercise_id, version),
  CONSTRAINT fk_ev_exercise FOREIGN KEY (exercise_id) REFERENCES exercises(id)
);

CREATE TABLE IF NOT EXISTS documents (
  id CHAR(36) PRIMARY KEY,
  topic_id CHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  local_path VARCHAR(255) NULL,
  drive_url TEXT NULL,
  created_at DATETIME(3) NOT NULL,
  CONSTRAINT fk_doc_topic FOREIGN KEY (topic_id) REFERENCES topics(id)
);

CREATE TABLE IF NOT EXISTS resources (
  id CHAR(36) PRIMARY KEY,
  topic_id CHAR(36) NULL,
  subject_id CHAR(36) NULL,
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  resource_type VARCHAR(64) NULL,
  created_at DATETIME(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS activity_attempts (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  activity_id CHAR(36) NOT NULL,
  activity_version_id CHAR(36) NOT NULL,
  client_request_id VARCHAR(64) NULL,
  status VARCHAR(32) NOT NULL,
  started_at DATETIME(3) NOT NULL,
  finished_at DATETIME(3) NULL,
  score DECIMAL(10,2) NULL,
  max_score DECIMAL(10,2) NULL,
  percentage DECIMAL(5,2) NULL,
  UNIQUE KEY uq_attempt_idempotency (user_id, client_request_id),
  CONSTRAINT fk_aa_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_aa_activity FOREIGN KEY (activity_id) REFERENCES activities(id),
  CONSTRAINT fk_aa_version FOREIGN KEY (activity_version_id) REFERENCES activity_versions(id)
);

CREATE TABLE IF NOT EXISTS exercise_attempts (
  id CHAR(36) PRIMARY KEY,
  activity_attempt_id CHAR(36) NULL,
  user_id CHAR(36) NOT NULL,
  exercise_id CHAR(36) NOT NULL,
  exercise_version_id CHAR(36) NOT NULL,
  client_request_id VARCHAR(64) NULL,
  status VARCHAR(32) NOT NULL,
  started_at DATETIME(3) NOT NULL,
  finished_at DATETIME(3) NULL,
  score DECIMAL(10,2) NULL,
  max_score DECIMAL(10,2) NULL,
  percentage DECIMAL(5,2) NULL,
  feedback TEXT NULL,
  UNIQUE KEY uq_ex_attempt_idempotency (user_id, client_request_id),
  CONSTRAINT fk_ea_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_ea_exercise FOREIGN KEY (exercise_id) REFERENCES exercises(id),
  CONSTRAINT fk_ea_version FOREIGN KEY (exercise_version_id) REFERENCES exercise_versions(id),
  CONSTRAINT fk_ea_activity_attempt FOREIGN KEY (activity_attempt_id) REFERENCES activity_attempts(id)
);

CREATE TABLE IF NOT EXISTS attempt_answers (
  id CHAR(36) PRIMARY KEY,
  exercise_attempt_id CHAR(36) NOT NULL,
  question_key VARCHAR(120) NOT NULL,
  answer_json LONGTEXT NOT NULL,
  is_correct TINYINT(1) NULL,
  score DECIMAL(10,2) NULL,
  created_at DATETIME(3) NOT NULL,
  CONSTRAINT fk_ans_attempt FOREIGN KEY (exercise_attempt_id) REFERENCES exercise_attempts(id)
);

CREATE TABLE IF NOT EXISTS activity_results (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  activity_id CHAR(36) NOT NULL,
  best_attempt_id CHAR(36) NULL,
  official_score DECIMAL(10,2) NULL,
  official_max_score DECIMAL(10,2) NULL,
  updated_at DATETIME(3) NOT NULL,
  UNIQUE KEY uq_activity_result_user (user_id, activity_id),
  CONSTRAINT fk_ar_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_ar_activity FOREIGN KEY (activity_id) REFERENCES activities(id)
);

CREATE TABLE IF NOT EXISTS achievements (
  id CHAR(36) PRIMARY KEY,
  code VARCHAR(64) NOT NULL UNIQUE,
  title VARCHAR(120) NOT NULL,
  description TEXT NULL,
  xp_reward INT NOT NULL DEFAULT 0,
  created_at DATETIME(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_achievements (
  user_id CHAR(36) NOT NULL,
  achievement_id CHAR(36) NOT NULL,
  awarded_at DATETIME(3) NOT NULL,
  PRIMARY KEY (user_id, achievement_id),
  CONSTRAINT fk_ua_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_ua_ach FOREIGN KEY (achievement_id) REFERENCES achievements(id)
);

CREATE TABLE IF NOT EXISTS xp_transactions (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  amount INT NOT NULL,
  reason VARCHAR(255) NOT NULL,
  created_at DATETIME(3) NOT NULL,
  CONSTRAINT fk_xp_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_xp_user ON xp_transactions(user_id);
