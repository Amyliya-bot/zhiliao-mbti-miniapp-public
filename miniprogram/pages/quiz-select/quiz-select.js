Page({
  goBack() {
    wx.navigateBack();
  },
  goToQuiz100() {
    wx.navigateTo({ url: '/pages/quiz100/quiz100' });
  },
  goToQuiz40() {
    wx.navigateTo({ url: '/pages/quiz/quiz' });
  }
});
