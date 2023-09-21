import { destroyCookie } from 'nookies'; // นำเข้า destroyCookie จาก nookies

export default function SignOut() {
  // ล้างคุกกี้ที่ใช้เก็บข้อมูลสถานะการลงชื่อเข้าใช้ของผู้ใช้ (ตัวอย่างเช่น 'authToken')
  destroyCookie(null, 'authToken');

  // ทำการ Redirect ผู้ใช้ไปยังหน้าอื่นหลังจาก Sign Out (เช่นหน้า Home)
  // เราสามารถใช้ useRouter จาก Next.js เพื่อทำ Redirect ได้ง่ายๆ
  const router = useRouter();
  router.push('/'); // ให้ Redirect ไปยังหน้า Home

  return (
    <div>
      <p>กำลังออกจากระบบ...</p>
      {/* คุณสามารถแสดงข้อความหรือ UI อื่นๆ ตามที่คุณต้องการ */}
    </div>
  );
}
