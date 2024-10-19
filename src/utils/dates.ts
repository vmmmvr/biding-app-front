export function timeLeft(targetDate: Date) {
    // Parse the target date
    const endDate = new Date(targetDate);
    const now = new Date();
  
    // Calculate the difference in milliseconds
    const timeDifference = Number(endDate) - Number(now);
  
    if (timeDifference <= 0) {
      return "Time is up!";
    }
  
    // Calculate the days, hours, minutes, and seconds left
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);
  
    // Create a human-readable format
    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds left`;
  }
  
  export function isNowBetween(startDate: Date, endDate: Date) {
    // Get the current date and time
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Return true if now is between startDate and endDate (inclusive)
    return now >= start && now <= end;
  }
  
