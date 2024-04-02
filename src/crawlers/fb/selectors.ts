export const FB_SELECTORS = {
    login_popup_email: 'xpath///html/body/div[1]/div/div[1]/div/div[5]/div/div/div[1]/div/div[2]/div/div/div/div[2]/form/div/div[3]/div/label/div/div/input',
    login_popup_pass: 'xpath///html/body/div[1]/div/div[1]/div/div[5]/div/div/div[1]/div/div[2]/div/div/div/div[2]/form/div/div[4]/div/label/div/div/input',
    login_popup_post: 'xpath///html/body/div[1]/div/div[1]/div/div[5]/div/div/div[1]/div/div[2]/div/div/div/div[2]/form/div/div[5]/div/div',
    login_popup_form: 'xpath///html/body/div[1]/div/div[1]/div/div[5]/div/div/div[1]/div/div[2]/div/div/div',
    post_open: 'xpath/////html/body/div[1]/div/div[1]/div/div[4]/div/div/div[1]/div/div[2]/div/div/div/div/div/form',
    post_send: 'xpath///html/body/div[1]/div/div[1]/div/div[4]/div/div/div[1]/div/div[2]/div/div/div/div/div[1]/form/div/div[1]/div/div/div[1]/div/div[3]/div[3]/div/div',
    post_icon_file: 'xpath///html/body/div[1]/div/div[1]/div/div[4]/div/div/div[1]/div/div[2]/div/div/div/div/div[1]/form/div/div[1]/div/div/div[1]/div/div[3]/div[1]/div[2]/div[1]/div/span/div/div/div[1]/div/div/div[1]/img',
    post_file_el_alt: 'form input[type=file]',
    post_file_el: 'input[type=file]',
    page_discussion_tab: 'xpath///span[contains(text(), "Discussion")]',
    page_buy_sell_tab: 'xpath///span[contains(text(), "Buy and Sell")]',
    page_post_start: 'xpath///span[contains(text(), "Write something...")]',
    page_manage_post: 'xpath///span[contains(text(), "Pending post")]',
    page_history_posts: 'xpath///html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[2]/div/div/div/div/div/div/div[3]'
}

export const CONSOLE_STYLES = {
    succeeded: 'background: #3b4045; color: #b1ef36;',
    retrying: 'background: #ffd01e; color: #111;',
    failed: 'background: #d51e1e; color: #111;',
    progress_caption: 'background: #111; color: #02f1e8;',
    progress_body: 'background: #111; color: #02f1e8;',
}
