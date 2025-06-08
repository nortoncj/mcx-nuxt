export const useDashboard = () => {
    // Reactive state
    const data = ref({
      userGrowth: { value: 1250, change: 4.8 },
      totalSales: { value: 16920, change: 12.5 },
      engagement: { value: 42.5, change: 2.0 }
    })
  
    const activities = ref([
      { icon: '🏆', title: 'Achievement unlocked', time: '1 hour ago' },
      { icon: '💳', title: 'New card activated', time: '2 hours ago' },
      { icon: '💰', title: 'Transaction completed', time: '3 hours ago' }
    ])
  
    const chartData = ref({
      months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN','JUL','AUG','SEPT','OCT','NOV','DEC'],
      users: [],
      sales: []
    })
  
    // Methods
    const generateChartData = () => {
      const users = []
      const sales = []
      
      for (let i = 0; i < chartData.value.months.length; i++) {
        users.push(Math.random() * 100 + 20)
        sales.push(Math.random() * 80 + 30)
      }
      
      chartData.value.users = users
      chartData.value.sales = sales
    }
  
    const updateStats = () => {
      Object.keys(data.value).forEach(key => {
        const change = (Math.random() - 0.5) * 2
        const stat = data.value[key]
        
        if (key === 'totalSales') {
          stat.value += Math.floor(Math.random() * 100 - 50)
          stat.value = Math.max(0, stat.value)
        } else if (key === 'userGrowth') {
          stat.value += Math.floor(Math.random() * 10 - 5)
          stat.value = Math.max(0, stat.value)
        } else {
          stat.value += parseFloat((Math.random() * 2 - 1).toFixed(1))
          stat.value = Math.max(0, Math.min(100, stat.value))
        }
        
        stat.change = parseFloat((stat.change + change).toFixed(1))
      })
    }
  
    const updateActivities = () => {
      const newActivities = [
        { icon: '📧', title: 'New message received', time: 'Just now' },
        { icon: '🔔', title: 'System notification', time: '5 minutes ago' },
        { icon: '👤', title: 'User registered', time: '10 minutes ago' },
        { icon: '🛡️', title: 'Security scan completed', time: '15 minutes ago' }
      ]
      
      if (Math.random() > 0.7) {
        const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)]
        activities.value.unshift(randomActivity)
        activities.value = activities.value.slice(0, 3)
      }
    }
  
    // Auto-updates
    let updateInterval
    const startRealTimeUpdates = () => {
      updateInterval = setInterval(() => {
        updateStats()
        updateActivities()
      }, 30000)
    }
  
    const stopRealTimeUpdates = () => {
      if (updateInterval) {
        clearInterval(updateInterval)
      }
    }
  
    // Initialize
    onMounted(() => {
      generateChartData()
      startRealTimeUpdates()
    })
  
    onBeforeUnmount(() => {
      stopRealTimeUpdates()
    })
  
    return {
      data: readonly(data),
      activities: readonly(activities),
      chartData: readonly(chartData),
      updateStats,
      updateActivities,
      generateChartData
    }
  }