# טלפרומפטר חכם

אפליקציית טלפרומפטר (PWA) שאפשר להתקין על מסך הבית בטלפון או במחשב.
כתובת: **https://teleprompter.birkat-hanasi.com**

## יכולות
- גלילה אוטומטית עם שליטה במהירות, גודל גופן, מרווח שורות ורוחב טקסט
- קו קריאה, ספירה לאחור, היפוך אופקי/אנכי (למראות טלפרומפטר)
- מצב מצלמה: הטקסט מוצג מעל המצלמה (קדמית או אחורית), עם הקלטה והורדה/שיתוף של הווידאו
- כפתור התחלה אחד עם בחירת מצב: טקסט, מצלמה או הקלטה (+ מעקב קולי)
- מעקב קולי: הטקסט מתקדם לפי הדיבור (Web Speech API, עברית כברירת מחדל)
- עבודה ללא אינטרנט (Service Worker) ושמירת הטקסט וההגדרות במכשיר
- קיצורי מקלדת: רווח, חיצים, +/-, M, V, R, Esc

## קבצים
| קובץ | תפקיד |
|---|---|
| `index.html` | האפליקציה |
| `manifest.json` | הגדרות ההתקנה (שם, צבעים, אייקונים) |
| `sw.js` | Service Worker – עבודה אופליין |
| `icon-192.png`, `icon-512.png` | אייקונים |
| `CNAME` | הדומיין `teleprompter.birkat-hanasi.com` עבור GitHub Pages |
| `.github/workflows/pages.yml` | פריסה אוטומטית ל-GitHub Pages בכל push |

## חיבור הדומיין (פעם אחת)
1. **GitHub** → Settings → Pages → Build and deployment → Source: **GitHub Actions**.
2. **אצל ספק ה-DNS של birkat-hanasi.com** הוסיפו רשומה:

   | Type | Name | Value |
   |---|---|---|
   | CNAME | `teleprompter` | `shayh22.github.io` |

3. חזרו ל-Settings → Pages, ודאו שב-Custom domain מופיע `teleprompter.birkat-hanasi.com`,
   והמתינו לבדיקת ה-DNS. לאחר מכן סמנו **Enforce HTTPS** (נדרש למצלמה ולמיקרופון).

## עדכון גרסה
כשמשנים קבצים, העלו את המספר ב-`CACHE_NAME` בתוך `sw.js` (למשל `v2`) כדי שמכשירים שהתקינו את האפליקציה יקבלו את העדכון.
