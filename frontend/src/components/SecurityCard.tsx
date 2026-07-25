interface SecurityCardProps {
  icon: string
  title: string
  description: string
  onClick?: () => void
}

function SecurityCard({
  icon,
  title,
  description,
  onClick,
}: SecurityCardProps) {
  return (
    <div className="security-card">

      <div className="card-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <button onClick={onClick}>
        Open Module →
      </button>

    </div>
  )
}

export default SecurityCard