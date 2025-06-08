// composables/useDashboard.js
export const useDashboard = () => {
  // Reactive state
  const data = ref({
    userGrowth: { value: 1250, change: 4.8 },
    totalSales: { value: 16920, change: 12.5 },
    engagement: { value: 42.5, change: 2.0 }
  })

  const activities = ref([
    { 
      icon: '🏆', 
      title: 'Premium membership activated', 
      time: '2 minutes ago',
      type: 'achievement'
    },
    { 
      icon: '💳', 
      title: 'MCX Black Card delivered', 
      time: '1 hour ago',
      type: 'card'
    },
    { 
      icon: '💰', 
      title: 'Investment portfolio updated', 
      time: '3 hours ago',
      type: 'transaction'
    },
    { 
      icon: '🛡️', 
      title: 'Security scan completed', 
      time: '5 hours ago',
      type: 'security'
    },
    { 
      icon: '📊', 
      title: 'Monthly report generated', 
      time: '1 day ago',
      type: 'report'
    }
  ])

  const chartData = ref({
    months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL','AUG','SEP','OCT','NOV','DEC'],
    users: [],
    sales: [],
    userGrowthPath: '',
    salesGrowthPath: '',
    userAreaPath: '',
    salesAreaPath: ''
  })

  // Chart display settings
  const chartSettings = ref({
    selectedView: 'both', // 'users', 'sales', or 'both'
    showUsers: true,
    showSales: true
  })

  // Computed properties for showing/hiding chart elements
  const showUsers = computed(() => {
    return chartSettings.value.selectedView === 'users' || chartSettings.value.selectedView === 'both'
  })

  const showSales = computed(() => {
    return chartSettings.value.selectedView === 'sales' || chartSettings.value.selectedView === 'both'
  })

  // Methods
  const generateChartData = () => {
    const users = []
    const sales = []
    
    // Generate realistic trending data
    let userBase = 850
    let salesBase = 45
    
    for (let i = 0; i < chartData.value.months.length; i++) {
      // Users grow with some fluctuation
      userBase += Math.random() * 150 + 50
      users.push(Math.round(userBase))
      
      // Sales have seasonal patterns
      const seasonalMultiplier = 1 + Math.sin(i * Math.PI / 3) * 0.3
      salesBase += (Math.random() * 15 + 5) * seasonalMultiplier
      sales.push(Math.round(salesBase))
    }
    
    chartData.value.users = users
    chartData.value.sales = sales
    
    // Generate SVG paths for the charts
    generateSVGPaths()
  }

  const generateSVGPaths = () => {
    const { users, sales } = chartData.value
    
    if (users.length === 0) return
    
    // Normalize data for SVG (400 width, 100 height)
    const maxUsers = Math.max(...users)
    const minUsers = Math.min(...users)
    const maxSales = Math.max(...sales)
    const minSales = Math.min(...sales)
    
    // Generate user growth path and area
    const userPoints = users.map((value, index) => {
      const x = (index / (users.length - 1)) * 400
      const y = 80 - ((value - minUsers) / (maxUsers - minUsers)) * 60
      return { x, y, value }
    })
    
    // Generate sales growth path and area
    const salesPoints = sales.map((value, index) => {
      const x = (index / (sales.length - 1)) * 400
      const y = 80 - ((value - minSales) / (maxSales - minSales)) * 60 + 10
      return { x, y, value }
    })
    
    // Create smooth line paths
    chartData.value.userGrowthPath = createSmoothLinePath(userPoints)
    chartData.value.salesGrowthPath = createSmoothLinePath(salesPoints)
    
    // Create area paths (line + area to bottom)
    chartData.value.userAreaPath = createAreaPath(userPoints)
    chartData.value.salesAreaPath = createAreaPath(salesPoints)
  }

  const createSmoothLinePath = (points) => {
    if (points.length < 2) return ''
    
    let path = `M ${points[0].x},${points[0].y}`
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      
      if (i === 1) {
        const midX = prev.x + (curr.x - prev.x) / 2
        path += ` Q ${midX},${prev.y} ${curr.x},${curr.y}`
      } else {
        path += ` T ${curr.x},${curr.y}`
      }
    }
    
    return path
  }

  const createAreaPath = (points) => {
    if (points.length < 2) return ''
    
    // Start from bottom-left
    let path = `M ${points[0].x},100`
    path += ` L ${points[0].x},${points[0].y}`
    
    // Add the smooth line
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      
      if (i === 1) {
        const midX = prev.x + (curr.x - prev.x) / 2
        path += ` Q ${midX},${prev.y} ${curr.x},${curr.y}`
      } else {
        path += ` T ${curr.x},${curr.y}`
      }
    }
    
    // Close the area by going to bottom-right and back to start
    path += ` L ${points[points.length - 1].x},100 Z`
    
    return path
  }

  const changeChartView = (view) => {
    console.log('Changing chart view to:', view) // Debug log
    chartSettings.value.selectedView = view
    
    // Update the show flags based on the selected view
    switch(view) {
      case 'users':
        chartSettings.value.showUsers = true
        chartSettings.value.showSales = false
        break
      case 'sales':
        chartSettings.value.showUsers = false
        chartSettings.value.showSales = true
        break
      case 'both':
        chartSettings.value.showUsers = true
        chartSettings.value.showSales = true
        break
    }
    
    console.log('Updated flags - showUsers:', chartSettings.value.showUsers, 'showSales:', chartSettings.value.showSales)
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
      { 
        icon: '📧', 
        title: 'Exclusive invite received', 
        time: 'Just now',
        type: 'message'
      },
      { 
        icon: '🔔', 
        title: 'Market alert triggered', 
        time: '2 minutes ago',
        type: 'notification'
      },
      { 
        icon: '👤', 
        title: 'VIP member joined network', 
        time: '5 minutes ago',
        type: 'user'
      },
      { 
        icon: '💎', 
        title: 'Rare asset opportunity', 
        time: '8 minutes ago',
        type: 'opportunity'
      },
      { 
        icon: '🏛️', 
        title: 'Legacy fund contribution', 
        time: '12 minutes ago',
        type: 'transaction'
      },
      { 
        icon: '🌟', 
        title: 'Elite status milestone reached', 
        time: '15 minutes ago',
        type: 'achievement'
      },
      { 
        icon: '🔐', 
        title: 'Vault access granted', 
        time: '20 minutes ago',
        type: 'security'
      },
      { 
        icon: '💼', 
        title: 'Business network expanded', 
        time: '25 minutes ago',
        type: 'business'
      }
    ]
    
    // 40% chance to add a new activity
    if (Math.random() > 0.6) {
      const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)]
      
      // Add timestamp for sorting
      const now = new Date()
      randomActivity.timestamp = now.getTime()
      randomActivity.time = 'Just now'
      
      // Add to beginning and keep only 5 most recent
      activities.value.unshift(randomActivity)
      activities.value = activities.value.slice(0, 5)
      
      // Update timestamps for existing activities
      updateActivityTimes()
    }
  }

  const updateActivityTimes = () => {
    const timeLabels = ['Just now', '2 minutes ago', '5 minutes ago', '10 minutes ago', '15 minutes ago']
    
    activities.value.forEach((activity, index) => {
      if (index < timeLabels.length) {
        activity.time = timeLabels[index]
      }
    })
  }

  // Auto-updates
  let updateInterval

  const startRealTimeUpdates = () => {
    updateInterval = setInterval(() => {
      updateStats()
      updateActivities()
    }, 30000) // Update every 30 seconds
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
    chartSettings,
    updateStats,
    updateActivities,
    generateChartData,
    changeChartView
  }
}