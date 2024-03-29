# Simple Calculator

 
Simple Calculator is an application which enables a user to perform simple one-time calculations. It might be extremely useful when a user needs to rapidly calculate some large numbers and receive at least an approximate result (for example, with exponent included). The calculator has a responsive design and can be used on both desktop and mobile devices.

- Type numbers using either a keyboard or just mouse clicks
- Use multiple operations
- Get your result!

## Features

### ************************************************************
- Multiple different available operations __(*, +, -, /, %)__
- The result is displayed only after the user presses '=', so the user is able to obvise which numbers are in use in a lower part of display
- Entire keyboard support
- You can operate with either decimal numbers or integers
- Clear button can clear off not only the number on the display but also the whole being performed operation too

### ************************************************************



## Installation

To use the calculator, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/JohnnyKoshev/SimpleCalculator.git
   ```

2. Open the project directory:

   ```
   cd SimpleCalculator
   ```

4. Compile `index.ts` file. Run in the project directory the following command:
   
   ```
   tsc
   ```

3. Open the `index.html` file in your preferred web browser.

## User Flow -- Operations
- Multiplication/Subtraction/Addition/Division
    - Firstrly, type your number into the display (using either keyboard or mouse-clicks) and choose an operation to perform
    
    ![](https://i.ibb.co/Chx9sfR/multiplication-1.png)
    
    - Secondly, as you see the display now shows *__0__*, so type your second number and to apply it you can press either *__=__* or your *__operation__*
    
    ![](https://i.ibb.co/0XybZBN/Screenshot-2.png)
    
    - Lastly, press *__=__* to get the result. Notice that on this step, you are not able to type anything, the only permitted button is *__the equality sign__*
    
    ![](https://i.ibb.co/WB3yRT3/Screenshot-5.png)
    ![](https://i.ibb.co/DMXndL0/Screenshot-4.png)
- Percentage
  - Firstly, type in your number to evaluate its percentage and press *__%__*
  
   ![](https://i.ibb.co/xY52txJ/percentage.png)
   
  - At this moment, only *__=__* is available to be pressed to get the result
  
   ![](https://i.ibb.co/8DkDCCM/percentage-2.png)
   ![](https://i.ibb.co/bgjdjRK/percentage-3.png)

## Dependencies

This calculator application does not have any external dependencies. It is built using plain HTML, CSS, and TypeScript.
  
## License

The project is licensed under the MIT License.  


## Acknowledgements

This calculator application was developed as a simple exercise to practice HTML, CSS, and TypeScript. It is not intended for production use, but feel free to modify and enhance it according to your needs.  
