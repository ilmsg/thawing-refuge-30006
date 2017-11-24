# thawing-refuge-30006
เว็บบล็อก สร้างด้วย nodejs, expressjs, mongodb

demo: [https://thawing-refuge-30006.herokuapp.com](https://thawing-refuge-30006.herokuapp.com)

- อีเมล์: demo@gmail.com
- รหัสผ่าน: demo

ล็อกอิน
[https://thawing-refuge-30006.herokuapp.com/users/login](https://thawing-refuge-30006.herokuapp.com/users/login)

1. รายการโพส
2. รายการหน้า
3. คลังเก็บ รายปี,รายเดือนปี
4. แท็กโพส
5. อัพโหลดรูปภาพ
6. จำนวนคนเปิดดู
7. เวลาโพสเมื่อที่ผ่านมา
8. กล่องคอมเม้น disqus

หน้าแรก
![หน้าแรก](https://github.com/ilmsg/thawing-refuge-30006/raw/master/screenshot/home-page.png)
---

รายละเอียดโพส
![หน้ารายละเอียดโพส](https://github.com/ilmsg/thawing-refuge-30006/raw/master/screenshot/post-view.png)
---

หน้าล็อกอิน
![หน้าล็อกอิน](https://github.com/ilmsg/thawing-refuge-30006/raw/master/screenshot/login-page.png)
---

รายการหน้า
![รายการหน้า](https://github.com/ilmsg/thawing-refuge-30006/raw/master/screenshot/admin-page-list.png)
---

รายการโพส
![รายการโพส](https://github.com/ilmsg/thawing-refuge-30006/raw/master/screenshot/admin-post-list.png)
---

แก้ไขโพส
![แก้ไขโพส](https://github.com/ilmsg/thawing-refuge-30006/raw/master/screenshot/admin-post-edit.png)
---

		.
		├── app.js
		├── helper.js
		├── LICENSE
		├── models
		│   ├── archive.js
		│   ├── contact.js
		│   ├── page.js
		│   ├── picture.js
		│   ├── post.js
		│   └── user.js
		├── package.json
		├── package-lock.json
		├── Procfile
		├── public
		│   ├── css
		│   │   ├── bootstrap.css
		│   │   ├── bootstrap.css.map
		│   │   ├── bootstrap.min.css
		│   │   ├── bootstrap.min.css.map
		│   │   ├── bootstrap-theme.css
		│   │   ├── bootstrap-theme.css.map
		│   │   ├── bootstrap-theme.min.css
		│   │   ├── bootstrap-theme.min.css.map
		│   │   ├── font-awesome.css
		│   │   ├── font-awesome.min.css
		│   │   ├── jquery.tagsinput.min.css
		│   │   └── style.css
		│   ├── fonts
		│   │   ├── FontAwesome.otf
		│   │   ├── fontawesome-webfont.eot
		│   │   ├── fontawesome-webfont.svg
		│   │   ├── fontawesome-webfont.ttf
		│   │   ├── fontawesome-webfont.woff
		│   │   ├── fontawesome-webfont.woff2
		│   │   ├── glyphicons-halflings-regular.eot
		│   │   ├── glyphicons-halflings-regular.svg
		│   │   ├── glyphicons-halflings-regular.ttf
		│   │   ├── glyphicons-halflings-regular.woff
		│   │   └── glyphicons-halflings-regular.woff2
		│   ├── img
		│   │   ├── favicon.png
		│   │   └── nopicture.jpg
		│   ├── js
		│   │   ├── bootstrap.js
		│   │   ├── bootstrap.min.js
		│   │   ├── jquery.js
		│   │   ├── jquery.min.js
		│   │   ├── jquery.min.map
		│   │   ├── jquery.tagsinput.min.js
		│   │   ├── moment-with-locales.min.js
		│   │   ├── npm.js
		│   │   └── script.js
		│   └── uploads
		├── README.md
		├── routes
		│   ├── index.js
		│   ├── page.js
		│   ├── post.js
		│   └── user
		│       ├── contact.js
		│       ├── index.js
		│       ├── page.js
		│       └── post.js
		├── screenshot
		│   ├── admin-page-list.png
		│   ├── admin-post-edit.png
		│   ├── admin-post-list.png
		│   ├── home-page.png
		│   ├── login-page.png
		│   └── post-view.png
		└── views
				├── about.ejs
				├── contact.ejs
				├── error.ejs
				├── index.ejs
				├── layout.ejs
				├── page
				│   ├── detail.ejs
				│   └── list.ejs
				├── pagging.ejs
				├── post
				│   ├── detail.ejs
				│   └── list.ejs
				└── user
						├── contact
						│   └── list.ejs
						├── index.ejs
						├── login.ejs
						├── page
						│   ├── edit.ejs
						│   └── list.ejs
						├── post
						│   ├── edit.ejs
						│   └── list.ejs
						├── profile.ejs
						└── register.ejs

17 directories,79 files


MIT License

Copyright (c) 2017 Eak Netpanya

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
