import { useAppStore } from "@/store"


const ProfilePage = () => {
  const {userInfo}=useAppStore()
  return (
    <>
    <div>Profile</div>
    <div>{userInfo.email}</div>
    </>
  )
}

export default ProfilePage