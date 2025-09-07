import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext'; // <- requerido para pInputText
import { NgClass, NgIf, NgFor } from '@angular/common'; // para *ngIf, *ngFor, [ngClass]
import { FilterField } from '../../core/enums/filterField';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    NgClass,
    NgIf,
    NgFor,
  ],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css',
})
export class FilterModalComponent {
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() apply = new EventEmitter<any>();

  filterForm!: FormGroup;
  constructor(private fb: FormBuilder) { }
  FilterField = FilterField;

  filterFields = [
    { key: FilterField.PAYMENT_TYPE, name: 'Payment Type' },
    { key: FilterField.AMOUNT, name: 'Amount' },
    { key: FilterField.PAYEE_NAME, name: 'Payee Name' },
    { key: FilterField.DESTINATION, name: 'Destination' },
    { key: FilterField.PAYMENT_ID, name: 'Payment ID' },
    { key: FilterField.PAYMENT_STATUS, name: 'Payment Status' },
  ];

  selectedCategories: any[] = [];


  categories = [
    { key: 'category1', name: 'Check' },
    { key: 'category2', name: 'Digital Check' },
    { key: 'category3', name: 'ACH/ETF' },
  ];

  selectedFilter: FilterField = this.filterFields[0].key;

  ngOnInit(): void {
    const paymentTypeFormGroup = this.fb.group({});
    this.categories.forEach((category) => {
      paymentTypeFormGroup.addControl(category.key, new FormControl(false));
    });

    this.filterForm = this.fb.group({
      [FilterField.PAYMENT_TYPE]: paymentTypeFormGroup, // <- Use the new FormGroup here
      [FilterField.AMOUNT]: this.fb.group({
        min: new FormControl(null),
        max: new FormControl(null),
      }),
      [FilterField.PAYEE_NAME]: new FormControl(''),
      [FilterField.DESTINATION]: new FormControl(''),
      [FilterField.PAYMENT_ID]: new FormControl(''),
      [FilterField.PAYMENT_STATUS]: new FormControl(''),
    });
  }

  selectFilter(fieldKey: string): void {
    this.selectedFilter = fieldKey as FilterField;
  }

  get selectedFilterName(): string {
    return (this.filterFields.find(f => f.key === this.selectedFilter)?.name as string);
  }

  close(): void {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  applyFilters(): void {
    this.apply.emit(this.filterForm.value);
    this.close();
  }
}
