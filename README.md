# Automation Test Project - OrangeHRM with Playwright

Kiểm thử tự động Web UI cho OrangeHRM sử dụng Playwright và Data-Driven Testing (DDT).

Sinh viên: Phan Nguyễn Duy Khang
MSSV: 2201700147

---

## Test Cases: 29 Scenarios

Total: 29 test cases x 2 browsers (Chrome, Firefox) = 58 tests

### 1. LOGIN (11 cases)
- 1 success: Admin/admin123
- 10 failures: wrong password, wrong username, empty fields, SQL injection, whitespace, special chars

### 2. SEARCH (9 cases)
- 3 valid: full name, first char, 2 chars
- 6 invalid: non-existent name, numbers, special chars, XSS injection, etc

### 3. ADD CANDIDATE (9 cases)
- 4 valid: Thanh Duy, Hung Vuong, John Smith, Jane Doe
- 5 invalid: empty firstName, empty lastName, invalid email, invalid phone

---

## Data-Driven Testing (DDT)

Dữ liệu test lưu trong JSON files:

test-data/users.json - 11 login scenarios
test-data/search.json - 9 search scenarios  
test-data/candidate.json - 9 candidate scenarios

Mỗi test case loop qua data, không hardcode.

---

## Setup & Run

npm install

npm run test:setup

npm test

npm run report

---

## Multi-Browser Testing

Supported: Chromium (Chrome) + Firefox

Projects: 7 (1 setup + 6 test projects)

---

## Git Repository

https://github.com/TakiyaYoru/2201700147_PhanNguyenDuyKha_OrangeHRM_Playwright_DDT

### B9. Cấu hình report trong playwright.config.ts
- Cấu hình HTML reporter
- Cấu hình projects: setup + login, search, candidate
- Multi-browser: Chromium, Firefox

### B10. Chạy và xem report
```bash
npx playwright test
npx playwright show-report
```

---

## Cấu Trúc Project

```
2201700147_PhanNguyenDuyKha_OrangeHRM_Playwright/
├── tests/
│   ├── auth.setup.ts              (Setup: Đăng nhập & lưu auth.json)
│   ├── login.spec.ts              (11 test cases Login)
│   ├── search.spec.ts             (9 test cases Search)
│   └── addCandidate.spec.ts       (9 test cases Add Candidate)
├── test-data/
│   ├── users.json                 (11 DDT cases Login)
│   ├── search.json                (9 DDT cases Search)
│   └── candidate.json             (9 DDT cases Candidate)
├── auth/
│   └── auth.json                  (Session storage - auto-created)
├── playwright-report/             (HTML report - auto-created)
├── playwright.config.ts           (Config & projects)
├── package.json
├── .gitignore
└── README.md
```

---

## Chạy Project

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy setup (B5 - Lưu session)
```bash
npm run test:setup
```

### 3. Chạy toàn bộ test
```bash
npm test
```

### 4. Chạy riêng từng test
```bash
npm run test:login
npm run test:search
```

### 5. Xem báo cáo
```bash
npm run report
```

---

## Data-Driven Testing (DDT)

### Login Test Cases (11)
Success:
- Login thành công với tài khoản Admin

Failure:
- Mật khẩu sai
- Username sai
- Cả username và password sai
- Username trống
- Password trống
- Cả hai trường trống
- Username có khoảng trắng thừa
- Password có khoảng trắng thừa
- Ký tự đặc biệt trong username
- SQL Injection attempt

### Search Test Cases (9)
Valid:
- Tìm theo tên đầy đủ (Admin)
- Tìm theo ký tự đầu (a)
- Tìm theo 2 ký tự (ad)

Invalid:
- Tên không tồn tại (XXXXXXXXXXX)
- Nhập số thay tên (123456789)
- Ký tự đặc biệt (!@#$%^&*())
- XSS injection (<script>alert(1)</script>)
- Ký tự sai ở cuối (zzzzzzzzz)
- Slash nhiều lần (////)

### Candidate Test Cases (9)
Valid:
- Thanh Duy
- Hùng Vương
- John Smith
- Jane Doe

Invalid:
- Không có firstName
- Không có lastName
- Email không hợp lệ
- Email rỗng
- Phone chứa ký tự chữ

---

## Multi-Browser Testing

Trình duyệt hỗ trợ:
- Chromium (Chrome)
- Firefox

Projects:
- setup: 1
- login: 2 (chrome + firefox)
- search: 2 (chrome + firefox)
- addcandidate: 2 (chrome + firefox)

Test Coverage:
- Login: 11 cases x 2 browsers = 22 tests
- Search: 9 cases x 2 browsers = 18 tests
- Candidate: 9 cases x 2 browsers = 18 tests
- Total: ~58 tests

---

## Troubleshooting

Lỗi: storageState not found
- Chạy: npm run test:setup

Lỗi: Element not found
- Dùng Playwright Inspector: npx playwright codegen [URL]

Timeout
- Kiểm tra kết nối internet
- Tăng timeout trong playwright.config.ts

---

Date: March 13, 2026
Version: 1.0.0
