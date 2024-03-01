Tax Calculator
Web App Brief
Overview

Tax Calculator is a web app that helps users calculate their income tax for the 2024/2025 tax year in South Africa. It allows users to enter their monthly salary, age, and deductions, and provides them with an estimate of their monthly and annual tax, as well as their net income. Tax Calculator aims to simplify and automate the tax calculation process for individuals, and to help them plan their finances accordingly.
The tagline is “Calculate your tax in minutes”.
Target market
Tax Calculator’s target market is individuals who earn a taxable income in South Africa and want to know how much tax they must pay. According to the South African Revenue Service, there were about 20.4 million registered taxpayers in the country as of February 2023, of which 13.7 million were individuals. The average individual income tax rate was 18.5%, and the total individual income tax revenue was R528.8 billion.
Tax Calculator’s ideal users are:
•	Between 25 and 55 years old.
•	Employed in the formal or informal sector.
•	Tech-savvy and comfortable using web apps.
•	Interested in personal finance and budgeting.
•	Looking for a quick and easy way to calculate their tax.
 
Competitive analysis
Some of the main competitors of Tax Calculator are:
•	Old Mutual Income Tax Calculator: A web app that calculates the personal income tax for the 2024/2025 tax year in South Africa, based on the user’s age, monthly salary, and deductions. It also provides a tax table and a graph for comparison. The app is simple, user-friendly, and accurate, but it does not offer any additional features or functionalities.
•	SA Tax Calculator: A mobile app that calculates the personal income tax for the 2024/2025 tax year in South Africa, based on the user’s age, monthly salary, and deductions. It also provides a tax table and a graph for comparison. The app is fast, convenient, and reliable, but it is only available for Android devices, and it has a lot of ads.
•	SARS Mobi-App: A mobile app that allows users to access various services and information from the South African Revenue Service, such as filing tax returns, requesting statements, viewing status, and using the tax calculator. The app is comprehensive, secure, and official, but it is only available for iOS and Android devices, and it requires registration and verification.
Tax Calculator’s unique selling points are:
•	It is a web app that can be accessed from any device and browser, without any installation or registration.
•	It is focused on providing a simple and intuitive tax calculation experience, without any unnecessary or distracting features or functionalities.
•	It is updated with the latest tax rates and rules, and it provides accurate and reliable results.
Design
•	Colour scheme:  Blue, White, Green. 
•	Typography: Sans Serif such as Verdana or Arial. 
•	Icons: Results icon, and other icons will be developed with time if necessary. 
•	Layout: Make web and mobile friend. Example: using grid system to arrange content in columns and rows, or a card-based design to display information in bite-sized chunks.
 
Functionality
These are the main aspects of the functionality of the app:
•	Inputs: The inputs are the data or information that your users enter or provide to your web app, such as their monthly salary, age, and deductions. The inputs are easy to use, validate, and secure. We will use input fields, checkboxes, radio buttons, or sliders to collect user inputs, and use error messages, tooltips, or help texts to guide and assist them.
1.	The most important inputs are:
	int Age
	double mainIncome
2.	DEDUCTIONS
	bool and double medAid
	bool and double providentFund
	bool and double pensionFund
	bool and double retirementAnnuity
	bool and double monthlyDonations
•	Outputs: The outputs are the data or information that your web app returns or displays to your users, such as their monthly and annual tax, and their net income. You should make sure that your outputs are accurate, reliable, and useful. For example, you could use tables, charts, graphs, or animations to present user outputs, and use labels, legends, or captions to explain and interpret them.
1.	The most important outputs are: 
	double netIncome
	Results breakdown (multiple variables: pension & provident fund, taxable income, income tax, UIF contribution – all doubles.)
•	Calculations: The calculations are the mathematical operations or formulas that the web app performs on the user inputs to produce the user outputs, such as the tax rates and rules for the 2024/2025 tax year in South Africa.
1.	First step is to find the tax bracket. E.g. if you earn R30 000 a month and pay R2 000 for medical aid + 10% to provident and pension funds, the second bracket is where your taxable income is as per SARS rates below.
From SARS: 2024 tax year (1 March 2023 – 29 February 2024)

-------------------------------------------------------------------------
Taxable Income	Rates of Tax (R)					|
------------------------------------------------------------------------|
1 – 237 100 	18% of taxable income					|
237 101 – 370 500	42 678 + 26% of taxable income above 237 100	|
370 501 – 512 800	77 362 + 31% of taxable income above 370 500	|
512 801 – 673 000	121 475 + 36% of taxable income above 512 800	|
673 001 – 857 900	179 147 + 39% of taxable income above 673 000	|
857 901 – 1 817 000	251 258 + 41% of taxable income above 857 900	|
1 817 001 and above	644 489 + 45% of taxable income above 1 817 000	|
-------------------------------------------------------------------------

1.	Second step is to deduct non-taxable expenses such as medical aid, donations, etc. So far, our income is 30 000 – 2 000= R28 000. 
2.	Check if income is within our outside of threshold before proceeding. If the person is of certain age, and earn less than the threshold, then no tax is required to be paid. You can stop the script here. 
	Here is the threshold according to SARS in 2024.
--------------------------------------------------------------- 
Age		2025	2024	2023	2022
Under 65	R95 750	R95 750	R91 250	R87 300
65 an older
R148 217	R148 217	R141 250	R135 150
75 and older
R165 689	R165 689	R157 900	R151 100
---------------------------------------------------------------

3.	Provident and pension fund can be any percentage of the gross income. Both let’s say are 10% together, so R2 800. 
4.	Now let’s calculate the taxable income which is R28 000 – R2 800 = R25 200. 
5.	Find the bracket:
	R25 200 x 12 months = R302 400 yearly. 
	R302 400 is above R237 100 but below R370 500. So, we say R302 400 - R237 100 = R65 300. This is the taxable income where we will take 26% from and add it to the fixed rate of R42 678. 
	So, (26% x R65 300) + R42 678 = R59 656 yearly tax. 
6.	Deduct tax rebates. R59 656 – R17 235 (because 30 years old get primary rebate) = R42 421 yearly net tax. 
7.	Find monthly tax: which is R42 421/12 = R3 535,08 MONTHLY TAX. 
8.	Let’s also deduct 1% from gross income (before deductions) for UIF. If income is greater than R17 712 per month, then UIF Contribution is R177,12 per month. If not, it is exactly 1% of salary before any deductions. In our case, it is more, so we deduct R177,12.
9.	Now let’s put it all together. Take home pay or net income is:
	Gross income – medical aid - monthly tax – provident fund – pension fund – UIF. 
	R30 000 – R2 000 – R3 535,08 – R1 400 – R1 400 –   R177,12
= R21 487, 80. 
10.	In other cases, there could be donations as well. So, let’s say for example, you donate R500 monthly, then just subtract it from the gross income directly, just like the medical aid.
	Gross income – medical aid - monthly tax – provident fund – pension fund – UIF – Donation. 
	R30 000 – R2 000 – R3 535,08 – R1 400 – R1 400 – R177,12 – R500
= R20 987, 80. 
•	Validations: The validations are the checks or tests that your web app performs on the user inputs or outputs to ensure that they meet certain criteria or conditions, such as the minimum or maximum values, the required or optional fields, or the correct or incorrect formats. You should make sure that your validations are consistent, comprehensive, and clear. For example, you could use regular expressions, conditional statements, or loops to perform your validations, and use icons, colours, or sounds to indicate the validation results.
•	Processes
Results are shown after a 3 second delay. You can clear the results.
•	Steps the user needs to follow to get the results.
 
	-> Go to the web app link
	-> Type your age and income in the fields
	-> Select the deduction options that apply to you
	-> Submit
