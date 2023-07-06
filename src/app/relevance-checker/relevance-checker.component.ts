import { Component } from '@angular/core';
import { CustomqueryService } from '../customquery.service';

@Component({
  selector: 'app-relevance-checker',
  templateUrl: './relevance-checker.component.html',
  styleUrls: ['./relevance-checker.component.css'],
})
export class RelevanceCheckerComponent {
  querytext: string = '';
  fraction: number = 0;
  partName: string = '';
  value: number = 0;
  operator: string = 'and';
  partNameWeights: { partName: string; partWeight: string }[] = [];
  relevanceTransforms: {
    transform: string;
    querytext: string;
    fraction: number;
    partName: string;
    value: number;
    operator: string;
    partNames: string[];
  }[] = [];

  records: any[] = [];

  constructor(private customQueryService: CustomqueryService) {}

  sendPostRequest() {
    const relevanceTransformsPayload =
      this.generateRelevanceTransformsPayload();
    console.log('Relevance Transforms:', this.relevanceTransforms);
    console.log('Relevance Transforms Payload:', relevanceTransformsPayload);

    this.customQueryService
      .postQuery(
        this.querytext,
        this.fraction,
        this.partName,
        this.value,
        this.operator,
        this.partNameWeights,
        relevanceTransformsPayload
      )
      .subscribe((data: any) => {
        this.records = data.records;
      });
  }

  generateRelevanceTransformsPayload(): string {
    const relevanceTransformsXml = this.relevanceTransforms
      .map((transform) => {
        const selectedPartName = transform.partName; // Get the selected partName

        if (!selectedPartName) return ''; // Skip if no partName is selected

        const partNamesXml = `
          <${transform.transform} fraction="${transform.fraction}">
            <PartNames mode="and">
              ${
                selectedPartName
                  ? `<PartName>${selectedPartName}</PartName>`
                  : ''
              }
            </PartNames>
            <Action op="${transform.operator}" value="${
          transform.value
        }"></Action>
          </${transform.transform}>`;

        return partNamesXml;
      })
      .join('\n');

    const relevanceTransformsPayload = `<RelevanceTransforms>
  ${relevanceTransformsXml}
</RelevanceTransforms>`;

    return relevanceTransformsPayload;
  }

  addRelevanceTransform() {
    const newTransformRow = {
      transform: 'PartNameBoost',
      querytext: this.querytext, // Pass the querytext value
      fraction: 0,
      partName: '',
      value: 0,
      operator: 'and',
      partNames: [],
    };

    this.relevanceTransforms.push(newTransformRow);

    // Call getPartNames() to populate part names for the newly added row
    this.getPartNames(newTransformRow.querytext, newTransformRow);
  }
  removeRelevanceTransform(index: number) {
    this.relevanceTransforms.splice(index, 1);
  }

  getPartNames(queryText: string, transformRow: any) {
    if (transformRow.partName === 'text') {
      transformRow.partNames = ['text'];
    } else {
      this.customQueryService
        .getPartNames(queryText)
        .subscribe((response: any) => {
          const partNames =
            response?.datasets?.partnames?.aggregations[0]?.items.map(
              (item: any) => item.value
            );
          transformRow.partNames = partNames;
        });
    }
  }

  addRow() {
    const newRow = { partName: '', partWeight: '', partNames: [] };
    if (this.querytext) {
      this.getPartNames(this.querytext, newRow);
    }
    this.partNameWeights.push(newRow);
  }

  removeRow(index: number) {
    this.partNameWeights.splice(index, 1);
  }
}
