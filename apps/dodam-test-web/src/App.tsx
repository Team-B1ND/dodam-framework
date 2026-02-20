const App = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const top = `${searchParams.get("top") || 0}px`;
  const bottom = `${searchParams.get("bottom") || 0}px`;

  return (
    <div style={{ paddingTop: top, paddingBottom: bottom }}>
      <button></button>
    </div>
  )
}

export default App