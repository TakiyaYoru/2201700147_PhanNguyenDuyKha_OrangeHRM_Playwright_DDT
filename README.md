# Automation Test Project - OrangeHRM with Playwright

Đây là project kiểm thử tự động Web UI cho ứng dụng OrangeHRM sử dụng Playwright và kỹ thuật Data-Driven Testing (DDT).

**Sinh viên**: Phan Nguyễn Duy Khang  
**MSSV**: 2201700147  

---

##  Quy Trình Xây Dựng Project (B1-B10)

### **B1. Khởi tạo project**
```bash
npm init playwright@latest
```

### **B2. Tạo file test-data/users.json**
Chứa 7 test cases:
- 1 case đăng nhập thành công (Admin)
- 6 cases đăng nhập thất bại (mật khẩu sai, username sai, trường trống, etc)

### **B3. Codegen lấy locator**
```bash
npx playwright codegen --output=tests/login.spec.ts https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
```

### **B4. Sửa tay thay hardcode bằng JSON**
- Thay thế hardcode bằng dữ liệu từ users.json
- Dùng loop `for...of` để tạo dynamic test cases

### **B5. Lưu session auth.json**
```bash
npx playwright codegen --save-storage=auth/auth.json https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
```

### **B6. Tạo test-data/search.json**
Chứa:
- `validSearch`: 3 cases tìm kiếm thành công
- `invalidSearch`: 4 cases tìm kiếm thất bại (tên không tồn tại, số, ký tự đặc biệt, XSS)

### **B7. Codegen lấy locator màn hình search**
```bash
npx playwright codegen --load-storage=auth/auth.json --output=tests/search.spec.ts https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList
```

### **B8. Sửa code search data từ JSON file**
- Sử dụng auth/auth.json để bỏ qua login
- Loop qua validSearch và invalidSearch
- Verify kết quả tìm kiếm

### **B9. Cấu hình report trong playwright.config.ts**
- Cấu hình HTML reporter
- Cấu hình projects: setup và authenticated
- Setup dependencies: authenticated tests chỉ chạy sau khi setup xong

### **B10. Chạy và xem report**
```bash
# Chạy riêng search
npx playwright test tests/search.spec.ts

# Mở lại report
npx playwright show-report
```

---

##  Hướng Dẫn Chạy Project

### **1. Cài đặt dependencies**
```bash
npm install
```

### **2. Chạy setup (B5 - Lưu session)**
```bash
npm run test:setup
```
Hoặc:
```bash
npx playwright test tests/auth.setup.ts
```

### **3. Chạy toàn bộ test**
```bash
npm test
```

### **4. Chạy riêng từng test**
```bash
# Chạy login tests
npm run test:login

# Chạy search tests
npm run test:search

# Chạy ở chế độ headed (xem browser)
npm run test:headed

# Chạy ở chế độ debug
npm run test:debug
```

### **5. Xem báo cáo**
```bash
npm run report
```

---

##  Cấu Trúc Project

```
2201700147_PhanNguyenDuyKha_OrangeHRM_Playwright/
├── tests/
│   ├── auth.setup.ts              # B5: Setup & lưu auth.json
│   ├── login.spec.ts              # B3-B4: Login tests (7 cases)
│   └── search.spec.ts             # B7-B8: Search tests (7 cases)
├── test-data/
│   ├── users.json                 # B2: Login test data
│   └── search.json                # B6: Search test data
├── auth/
│   └── auth.json                  # B5: Session storage (auto-created)
├── playwright-report/             # B10: HTML report
├── playwright.config.ts           # B9: Config & projects setup
├── package.json
├── .gitignore
└── README.md
```

---

##  Key Features

**Data-Driven Testing** - Dữ liệu test trong JSON files  
 **Session Management** - Lưu & tái sử dụng session auth  
 **Projects Setup** - Setup project chạy trước, authenticated chạy sau  
 **HTML Reports** - Tự động open report sau khi test  
 **Screenshots** - Chụp ảnh khi test thất bại  
 **Videos** - Ghi video khi test thất bại  

---

## Test Cases

| File | Số Test | Mô Tả |
|------|---------|-------|
| auth.setup.ts | 1 | Đăng nhập & lưu session |
| login.spec.ts | 7 | Login (1 success + 6 failure) |
| search.spec.ts | 7 | Search (3 found + 4 not found) |
| **Total** | **15** | **Test cases** |

---

## 🛠️ Troubleshooting

### Lỗi: `storageState not found`
```bash
npm run test:setup
```

### Lỗi: Element not found
1. Dùng Playwright Inspector: `npx playwright codegen [URL]`
2. Kiểm tra HTML để lấy selector chính xác

### Muốn xem browser khi test
```bash
npm run test:headed
```

---

**Tạo**: March 13, 2026 | **Phiên bản**: 1.0.0
