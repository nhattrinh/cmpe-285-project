/**
 * Get the from and to dates for the Polygon API request,
 * to is the current date and from is 5 days ago.
 */
export const getFromToDates = () => {
    // Get the current date
    const currentDate = new Date();

    // Calculate the start date (5 days ago)
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - 5);

    // Format the dates to YYYY-MM-DD
    const formatDate = (date) => date.toISOString().split('T')[0];
    const from = formatDate(startDate);
    const to = formatDate(currentDate);

    return { from, to };
};
