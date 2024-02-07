-- タスクテーブル
CREATE TABLE IF NOT EXISTS task (
    taskId INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    memo TEXT,
    limitDate TEXT,
    isCompleted INTEGER, -- bool値
    completionDate TEXT,
    progressStatus INTEGER,
    progressRate INTEGER,
    registerDate TEXT,
    updateDate TEXT
);

-- タスク詳細
CREATE TABLE IF NOT EXISTS taskdetail (
    detailId INTEGER,
    FOREIGN KEY (detailId) REFERENCES task(taskId)
);

-- タスクコメント
CREATE TABLE IF NOT EXISTS taskcomment (
    taskCommentId INTEGER PRIMARY KEY AUTOINCREMENT,
    taskId INTEGER,
    comment TEXT,
    registerDate TEXT,
    updateDate TEXT,
    FOREIGN KEY (taskId) REFERENCES taskdetail(detailId)
);

-- タグ名
CREATE TABLE IF NOT EXISTS tag (
    tagId INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    registerDate TEXT,
    updateDate TEXT
);
