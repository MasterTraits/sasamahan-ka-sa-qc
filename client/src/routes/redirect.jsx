
export default function redirect() {
  setTimeout(()=> {
    if (screen.width <= 650) 
      window.location.href = "/home"
    else 
      window.location.href = "/desktop"
  }, 700)

  return (
    <div className="h-screen w-full flex items-center justify-center">
      Redirecting you to a version that fits you..
    </div>
  )
}
