// utils.js - Helper functions

// Format time left
function getTimeLeft(endTime) {
  const now = Date.now()
  const timeLeft = endTime - now

  if (timeLeft <= 0) return "Ended"

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) {
    return `${days}d ${hours}h left`
  }

  return `${hours}h ${minutes}m left`
}

// Show notification
function showNotification(type, title, message) {
  const notification = document.getElementById("notification")
  const notificationIcon = notification.querySelector(".notification-icon i")
  const notificationTitle = notification.querySelector(".notification-title")
  const notificationDescription = notification.querySelector(".notification-description")

  // Set notification type
  notification.className = "notification"
  notification.classList.add(`notification-${type}`)

  // Set icon based on type
  if (type === "success") {
    notificationIcon.className = "fas fa-check-circle"
  } else if (type === "error") {
    notificationIcon.className = "fas fa-times-circle"
  } else if (type === "warning") {
    notificationIcon.className = "fas fa-exclamation-circle"
  }

  // Set content
  notificationTitle.textContent = title
  notificationDescription.textContent = message

  // Show notification
  notification.classList.add("active")

  // Auto hide after 5 seconds
  setTimeout(() => {
    notification.classList.remove("active")
  }, 5000)
}

// Format address
function formatAddress(address) {
  if (!address) return ""
  return `${address.substring(0, 6)}...${address.substring(38)}`
}

// Format LSK value with 4 decimal places
function formatLsk(value) {
  if (!value) return "0"
  return Number.parseFloat(value).toFixed(4)
}

// Convert duration to human-readable format
function formatDuration(seconds) {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""}`
  }

  return `${hours} hour${hours > 1 ? "s" : ""}`
}

// Parse skill description
function parseSkillDescription(description) {
  if (!description) return { title: "Skill Auction", description: "No description provided", category: "Service" }

  const parts = description.split("|")

  return {
    title: parts[0] ? parts[0].trim() : "Skill Auction",
    description: parts[1] ? parts[1].trim() : description,
    category: parts[2] ? parts[2].trim() : "Service",
  }
}

// Export functions
window.utils = {
  getTimeLeft,
  showNotification,
  formatAddress,
  formatLsk,
  formatDuration,
  parseSkillDescription,
}
