export interface FormFieldSelect{
  value: string;
  viewValue: string;
}

export interface FormField{
  type: 'input' | 'head',
  head?: string;
  class?: string;
  input?: {
    label: string;
    controlName: string;
    type?: string;
    placeholder?: string;
    select?: FormFieldSelect[];
  }
}
