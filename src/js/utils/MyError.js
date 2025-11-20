export class MyError extends Error {
    constructor(message, element = null) {
        super(message);
        this.name = "MyError";
        this.element = element;
    }

    display() {
        if (this.element) {
            const errorElement = document.createElement("div");
            errorElement.className = "error-message";
            errorElement.textContent = this.message;
            
            this.element.classList.add("error");
            
            const existingError = this.element.parentElement?.querySelector(".error-message");
            if (existingError) {
                existingError.remove();
            }
            
            if (this.element.parentElement) {
                this.element.parentElement.insertBefore(errorElement, this.element.nextSibling);
            } else {
                this.element.after(errorElement);
            }
        }
    }

    static clearErrors(container) {
        const errors = container.querySelectorAll(".error-message");
        errors.forEach(error => error.remove());
        
        const errorInputs = container.querySelectorAll(".error");
        errorInputs.forEach(input => {
            input.classList.remove("error");
            if (input.style) {
                input.style.borderColor = "";
            }
        });
    }
}
