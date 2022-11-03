// Code goes here!// Code goes here!
interface Validatable {
    min?: number;
    max?: number;
    minlength?: number;
    maxlength?: number;
    required: boolean;
    value: string | number;
}

function binder(_: any, _2: any, descriptor: PropertyDescriptor) {
    const newMethod = descriptor.value
    const boundMethod = {
        get () {
            const newVar = newMethod.bind(this)
            return newVar
        }
    }
    return boundMethod
}

const validator = (input: Validatable) => {
    let isValid = true;
    if(input.required && typeof input.value === 'string') {
        isValid = isValid && input.value.length > 0;
    }
    if(input.minlength && typeof input.value === 'string') {
        isValid = isValid && input.value.length > input.minlength;
    }
    if(input.maxlength && typeof input.value === 'string') {
        isValid = isValid && input.value.length < input.maxlength;
    }
     if(input.min && typeof input.value === 'number') {
        isValid = isValid && input.value > input.min;
    }   
    if(input.max && typeof input.value === 'number') {
        isValid = isValid && input.value < input.max;
    }
    return isValid;
}

class formInput {
    templateElement: HTMLTemplateElement
    domElement: HTMLDivElement
    myElement: HTMLFormElement
    myTitle: HTMLInputElement
    description: HTMLInputElement;
    people: HTMLInputElement;

    constructor () {
        this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement
        this.domElement = document.getElementById("app")! as HTMLDivElement

        const importTemplate = document.importNode(this.templateElement.content, true);
        this.myElement = importTemplate.firstElementChild as HTMLFormElement
        this.myTitle = this.myElement.querySelector('#title')! as HTMLInputElement;
        this.description = this.myElement.querySelector('#description')! as HTMLInputElement;
        this.people = this.myElement.querySelector('#people')! as HTMLInputElement;
        
        this.eventElement()
        this.add();
    }

    private validateInput(): [string, string, number] | void {
        const enteredTitle = this.myTitle.value
        const enteredDescription = this.description.value
        const enteredPeople = +this.people.value

        const validateTitle: Validatable = {
            value: enteredTitle,
            required: true,
        }

         const validateDescription: Validatable = {
            value: enteredDescription,
            required: true,
            maxlength: 12,
            minlength: 3
        }

        const validatePeople: Validatable = {
            value: enteredPeople,
            required: true,
            min: 2,
            max: 6
        }

        if(
            !validator(validateTitle) ||
            !validator(validateDescription) ||
            !validator(validatePeople)
        ) {
            alert('peleka hukooo')
            return;
        } else {
           return [enteredTitle, enteredDescription, enteredPeople];
        }

    }

    @binder
    private submitElement(e: Event) {
    e.preventDefault()
    this.validateInput();
    console.log('values: ')
    }

    private eventElement() {
     this.myElement.addEventListener('submit', this.submitElement)
    }

    add() {
    this.domElement.insertAdjacentElement("afterbegin", this.myElement)
    }
}

const inputEl = new formInput()