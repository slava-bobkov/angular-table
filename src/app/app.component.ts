import { ChangeDetectionStrategy, Component } from "@angular/core";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { TableColumnConfig, TableAction } from "./components/table/table.interfaces";

@Component({
  selector: "ngmy-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public columnsConfig: Array<TableColumnConfig> = [
    {
      id: "marketLocationId",
      type: "text",
      key: "Value 1",
      classes: "ellipsis",
      style: {
        maxWidth: "15%",
        minWidth: "15%"
      }
    },
    {
      id: "meterId",
      type: "text",
      key: "Value 2",
      classes: "ellipsis",
      style: {
        maxWidth: "9%"
      }
    },
    {
      id: "installationDesignation",
      type: "text",
      key: "Value 3",
      classes: "ellipsis",
      style: {
        minWidth: "20%"
      }
    },
    {
      id: "premiseTypeText",
      type: "text",
      key: "Value 1",
      classes: "ellipsis"
    },
    {
      id: "referenceNumber",
      type: "text",
      key: "Value 4",
      classes: "ellipsis"
    },
    {
      id: "address",
      type: "text",
      key: "Value 5",
      classes: "ellipsis"
    },
    {
      id: "accountingReviewState",
      type: "combined-values",
      key: "Value 6",
      classes: ["centered", "ellipsis"],
      style: {
        minWidth: "8%",
        maxWidth: "8%"
      },
      combinedValues: [
        { id: "accountingReviewState", type: "state" },
        { id: "warning", type: "icon" }
      ]
    },
    {
      id: "locateIcon",
      type: "action",
      key: "Value 7",
      actionIcon: "ec_building_show_on_map",
      classes: "secondary",
      style: {
        minWidth: "3%",
        maxWidth: "3%"
      }
    },
    {
      id: "editIcon",
      type: "action",
      key: "Value 8",
      actionIcon: "home",
      classes: "secondary",
      style: {
        minWidth: "3%",
        maxWidth: "3%"
      }
    }
  ];
  public data: Array<any> = [
    {
      installationId: "1011d1be-8a17-4a6a-8ce3-44d70138d806",
      marketLocationId: "50222222222",
      division: "electricity",
      meterId: "22222222",
      installationDesignation: "Straßenbeleuchtung",
      premiseTypeText: "Straßenbeleung",
      referenceNumber: "987654321",
      reviewState: "inReview",
      isNew: false,
      address: {
        postalCode: "99999",
        city: "Musterkommune",
        street: "Talstraße",
        district: null,
        streetNumber: "21S",
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: "9812c805-9ca6-492b-adcf-6c3f4c2b58c5",
      coordinates: {
        latitude: 48.6266498,
        longitude: 8.924629399999999
      },
      "nested-table": [
        {
          installationId: "nested",
          marketLocationId: "nested",
          division: "electricity",
          meterId: "22222222",
          installationDesignation: "Straßenbeleuchtung",
          premiseTypeText: "Straßenbeleung",
          referenceNumber: "987654321",
          reviewState: "inReview",
          isNew: false,
          address: {
            postalCode: "99999",
            city: "Musterkommune",
            street: "Talstraße",
            district: null,
            streetNumber: "21S",
            cityExtension: null,
            streetNumberSuffix: null
          },
          clusterId: "9812c805-9ca6-492b-adcf-6c3f4c2b58c5",
          coordinates: {
            latitude: 48.6266498,
            longitude: 8.924629399999999
          }
        }
      ]
    },
    {
      installationId: "f5111f79-ecc0-4ea0-8522-5684acc4f154",
      marketLocationId: null,
      division: "electricity",
      meterId: "111111111",
      installationDesignation: "Neue Anlage",
      premiseTypeText: null,
      referenceNumber: null,
      reviewState: "inReview",
      isNew: true,
      address: {
        postalCode: "11111",
        city: "Musterkommune",
        street: null,
        district: null,
        streetNumber: null,
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: null,
      coordinates: {}
    },
    {
      installationId: "89d0fea4-7e79-4822-8255-22869216a3f3",
      marketLocationId: null,
      division: "electricity",
      meterId: "123456789",
      installationDesignation: "Test RDO",
      premiseTypeText: null,
      referenceNumber: null,
      reviewState: "inReview",
      isNew: true,
      address: {
        postalCode: "99999",
        city: "Musterkommune",
        street: null,
        district: null,
        streetNumber: null,
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: null,
      coordinates: {}
    },
    {
      installationId: "dee9ea46-aefa-4753-9013-9f207ae6e3cc",
      marketLocationId: "50267676767",
      division: "electricity",
      meterId: "67676767",
      installationDesignation: "Pumpstation change",
      premiseTypeText: "Pumpwerk",
      referenceNumber: "101//Buch",
      reviewState: "inReview",
      isNew: false,
      address: {
        postalCode: "99999",
        city: "Musterkommune",
        street: "Seestraße",
        district: null,
        streetNumber: "1",
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: "d652e25d-fef6-42df-866b-a7b161c35f1d",
      coordinates: {
        latitude: 48.6252011,
        longitude: 8.9208596
      }
    },
    {
      installationId: "a845ff89-73b4-4f50-8a14-7ea7091be04d",
      marketLocationId: "50233333333",
      division: "electricity",
      meterId: "33333333",
      installationDesignation: "Straßenbeleuchtung",
      premiseTypeText: "Straßenbeleuchtung",
      referenceNumber: "T8245i",
      reviewState: "inReview",
      isNew: false,
      address: {
        postalCode: "99999",
        city: "Musterkommune",
        street: "Kirchplatz",
        district: null,
        streetNumber: "2",
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: "999286f7-1a0e-4de9-b074-3dd15cfb60a4",
      coordinates: {
        latitude: 48.62545329999999,
        longitude: 8.9225097
      }
    },
    {
      installationId: "61aa5da3-7413-40b5-b5cc-b4b66aeaeda8",
      marketLocationId: "50299999999",
      division: "electricity",
      meterId: "9ITR9999999999",
      installationDesignation: "Friedhof Change",
      premiseTypeText: "Friedhöfe",
      referenceNumber: "BNR-14556",
      reviewState: "inReview",
      isNew: false,
      address: {
        postalCode: "99999",
        city: "Musterkommune",
        street: "Kirchplatz",
        district: null,
        streetNumber: "9",
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: "999286f7-1a0e-4de9-b074-3dd15cfb60a4",
      coordinates: {
        latitude: 48.62545329999999,
        longitude: 8.9225097
      }
    },
    {
      installationId: "40ecead3-2d3c-494f-a6bd-5f439125c814",
      marketLocationId: "50288888888",
      division: "electricity",
      meterId: "88888888",
      installationDesignation: "Backhaus",
      premiseTypeText: "Gemeinschaftsbackanlage",
      referenceNumber: "87687654",
      reviewState: "inReview",
      isNew: false,
      address: {
        postalCode: "99999",
        city: "Musterkommune",
        street: "Seestraße",
        district: null,
        streetNumber: "10",
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: "d652e25d-fef6-42df-866b-a7b161c35f1d",
      coordinates: {
        latitude: 48.6252011,
        longitude: 8.9208596
      }
    },
    {
      installationId: "39c3640a-0c2e-4c5f-a9cb-5aec5a5589ae",
      marketLocationId: "50223232323",
      division: "electricity",
      meterId: "2ITR2323232323",
      installationDesignation: "Zehntscheune",
      premiseTypeText: "Gemeindehaus",
      referenceNumber: "1",
      reviewState: "inReview",
      isNew: false,
      address: {
        postalCode: "99999",
        city: "Musterkommune",
        street: "Buchenstraße",
        district: null,
        streetNumber: "4",
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: "6f774799-3701-4fc8-8305-0baf5005fddd",
      coordinates: {
        latitude: 48.62264580000001,
        longitude: 8.9216256
      }
    },
    {
      installationId: "8e3c6d3e-6ff1-4c19-a1f8-0318934bcbaf",
      marketLocationId: null,
      division: "electricity",
      meterId: "hallo",
      installationDesignation: "Neuster Test RDO",
      premiseTypeText: null,
      referenceNumber: null,
      reviewState: "inReview",
      isNew: true,
      address: {
        postalCode: "99999",
        city: "Musterkommune",
        street: null,
        district: null,
        streetNumber: null,
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: null,
      coordinates: {}
    },
    {
      installationId: "a6769523-5353-493b-97c7-6d9316e859b0",
      marketLocationId: "50266666666",
      division: "electricity",
      meterId: "6ITR6666666666",
      installationDesignation: "RÜB",
      premiseTypeText: "Regenrückhaltebecken",
      referenceNumber: "24558&754254",
      reviewState: "inReview",
      isNew: false,
      address: {
        postalCode: "99999",
        city: "Musterkommune",
        street: "Bergstraße",
        district: null,
        streetNumber: "4",
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: "efceb24f-f1d8-4717-8ec1-a5475b947c57",
      coordinates: {
        latitude: 48.6280328,
        longitude: 8.9267848
      }
    },
    {
      installationId: "a9403103-a815-423c-a690-59dbd1b44ced",
      marketLocationId: "50234343434",
      division: "electricity",
      meterId: "34343434",
      installationDesignation: "FW-Gebäude",
      premiseTypeText: "Asylantenwohnheim",
      referenceNumber: "0AIS",
      reviewState: "inReview",
      isNew: false,
      address: {
        postalCode: "99999",
        city: "Musterkommune",
        street: "Talstraße",
        district: null,
        streetNumber: " 11/2",
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: "9812c805-9ca6-492b-adcf-6c3f4c2b58c5",
      coordinates: {
        latitude: 48.6266498,
        longitude: 8.924629399999999
      }
    },
    {
      installationId: "266bb817-97a4-4edc-a990-23e178a157dd",
      marketLocationId: "50211111111",
      division: "electricity",
      meterId: "11111111",
      installationDesignation: "Straßenbeleuchtung Change AIS",
      premiseTypeText: "Straßenbeleuchtung",
      referenceNumber: "AIS123456789",
      reviewState: "inReview",
      isNew: false,
      address: {
        postalCode: "99999",
        city: "Musterkommune",
        street: "Bergstraße",
        district: null,
        streetNumber: "9999",
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: "efceb24f-f1d8-4717-8ec1-a5475b947c57",
      coordinates: {
        latitude: 48.6280328,
        longitude: 8.9267848
      }
    },
    {
      installationId: "b40575d2-bc4f-4540-aa96-936679a138ce",
      marketLocationId: "50212121212",
      division: "electricity",
      meterId: "1EMH1212121212",
      installationDesignation: "Rathaus AIS",
      premiseTypeText: "Rathaus",
      referenceNumber: "",
      reviewState: "inReview",
      isNew: false,
      address: {
        postalCode: "99999",
        city: "Musterkommune",
        street: "Bergstraße",
        district: null,
        streetNumber: "38",
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: "efceb24f-f1d8-4717-8ec1-a5475b947c57",
      coordinates: {
        latitude: 48.6280328,
        longitude: 8.9267848
      }
    },
    {
      installationId: "6038ba17-58f7-4aa1-86e5-de0aead038a3",
      marketLocationId: null,
      division: "electricity",
      meterId: "234",
      installationDesignation: "New installation for test",
      premiseTypeText: null,
      referenceNumber: "22222",
      reviewState: "inReview",
      isNew: true,
      address: {
        postalCode: "22222",
        city: "Musterkommune",
        street: null,
        district: null,
        streetNumber: null,
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: null,
      coordinates: {}
    },
    {
      installationId: "8f131421-0e4e-487c-b7cb-9baa51982f18",
      marketLocationId: "50245454545",
      division: "electricity",
      meterId: "45454545",
      installationDesignation: "Asylantenwohnheim",
      premiseTypeText: "Wohnung",
      referenceNumber: "AAAA!",
      reviewState: "inReview",
      isNew: false,
      address: {
        postalCode: "99999",
        city: "Musterkommune",
        street: "Buchenstraße",
        district: null,
        streetNumber: "19a",
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: "6f774799-3701-4fc8-8305-0baf5005fddd",
      coordinates: {
        latitude: 48.62264580000001,
        longitude: 8.9216256
      }
    },
    {
      installationId: "4282219b-ab9a-403e-b1b3-b901ab2bf3a0",
      marketLocationId: null,
      division: "electricity",
      meterId: "77777778",
      installationDesignation: "Test",
      premiseTypeText: null,
      referenceNumber: "Buchungsnr.000",
      reviewState: "inReview",
      isNew: true,
      address: {
        postalCode: "Test",
        city: "Test",
        street: null,
        district: null,
        streetNumber: null,
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: null,
      coordinates: {}
    },
    {
      installationId: "140c0bbb-85bc-4f06-ac8e-6be19565ceef",
      marketLocationId: "50277777777",
      division: "electricity",
      meterId: "77777777",
      installationDesignation: "JHS",
      premiseTypeText: "Schule",
      referenceNumber: "Buchungsnr.000",
      reviewState: "inReview",
      isNew: false,
      address: {
        postalCode: "99999",
        city: "Musterkommune",
        street: "Schulstraße",
        district: null,
        streetNumber: "21",
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: "aec681ee-f7a3-48ec-82a3-4424315a7de5",
      coordinates: {
        latitude: 48.626135299999994,
        longitude: 8.9266282
      }
    },
    {
      installationId: "356b0f11-2dc7-4373-b0a7-d588e9edb588",
      marketLocationId: "50233526117",
      division: "electricity",
      meterId: "56565656",
      installationDesignation: "RÜB",
      premiseTypeText: "Regenrückhaltebecken",
      referenceNumber: "5876755556",
      reviewState: "inReview",
      isNew: false,
      address: {
        postalCode: "99999",
        city: "Musterkommune",
        street: "Seestraße",
        district: null,
        streetNumber: " 3/1",
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: "d652e25d-fef6-42df-866b-a7b161c35f1d",
      coordinates: {
        latitude: 48.6252011,
        longitude: 8.9208596
      }
    },
    {
      installationId: "a98560a2-4bbf-475e-ae01-086c4b570372",
      marketLocationId: "50244444444",
      division: "electricity",
      meterId: "44444444",
      installationDesignation: "Kindergarten",
      premiseTypeText: "Kindergarten",
      referenceNumber: "7777REe",
      reviewState: "inReview",
      isNew: false,
      address: {
        postalCode: "99999",
        city: "Musterkommune",
        street: "Schulstraße",
        district: null,
        streetNumber: "2",
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: "aec681ee-f7a3-48ec-82a3-4424315a7de5",
      coordinates: {
        latitude: 48.626135299999994,
        longitude: 8.9266282
      }
    },
    {
      installationId: "32af2937-3e6d-4fb4-9992-8aa1cc7f1e52",
      marketLocationId: "50233526242",
      division: "electricity",
      meterId: "55555556",
      installationDesignation: "Verkehrsspiegelheizung3",
      premiseTypeText: "Verkehrsspiegel",
      referenceNumber: "754687458",
      reviewState: "inReview",
      isNew: true,
      address: {
        postalCode: "99998",
        city: "Musterkommune 1",
        street: "UmlautSeestraße_ä_ö_ü_Ä_Ö_Ü",
        district: null,
        streetNumber: "11",
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: null,
      coordinates: {}
    },
    {
      installationId: "de247db6-e833-4403-84de-6953a6a7ef1f",
      marketLocationId: null,
      division: "electricity",
      meterId: "test",
      installationDesignation: "slavatestwithguys",
      premiseTypeText: null,
      referenceNumber: "test",
      reviewState: "inReview",
      isNew: true,
      address: {
        postalCode: "12313",
        city: "Musterkommune",
        street: null,
        district: null,
        streetNumber: null,
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: null,
      coordinates: {}
    },
    {
      installationId: "948e4bbd-1ba7-43d3-b84f-2c579bab3708",
      marketLocationId: null,
      division: "electricity",
      meterId: "875325736",
      installationDesignation: "Hermione Granger",
      premiseTypeText: null,
      referenceNumber: null,
      reviewState: "inReview",
      isNew: true,
      address: {
        postalCode: "44444",
        city: "Godric's Hollow",
        street: "change",
        district: null,
        streetNumber: null,
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: null,
      coordinates: {}
    },
    {
      installationId: "a0f3db49-f292-4a28-a28e-00345c774d91",
      marketLocationId: "9999999",
      division: "electricity",
      meterId: "11111111111",
      installationDesignation: "test2",
      premiseTypeText: null,
      referenceNumber: "332323",
      reviewState: "inReview",
      isNew: false,
      address: {
        postalCode: "33333",
        city: "Musterkommune",
        street: null,
        district: null,
        streetNumber: null,
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: null,
      coordinates: {}
    },
    {
      installationId: "59fd7c1e-edcd-499d-bde9-89435edd45ae",
      marketLocationId: null,
      division: "electricity",
      meterId: "test3",
      installationDesignation: "test",
      premiseTypeText: null,
      referenceNumber: "3333333",
      reviewState: "inReview",
      isNew: true,
      address: {
        postalCode: "33333",
        city: "Musterkommune",
        street: null,
        district: null,
        streetNumber: null,
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: null,
      coordinates: {}
    },
    {
      installationId: "07db7247-ac92-47c5-b51f-9741791ecaf5",
      marketLocationId: null,
      division: "electricity",
      meterId: "777",
      installationDesignation: "BE_TESTING 2",
      premiseTypeText: null,
      referenceNumber: "777",
      reviewState: "inReview",
      isNew: true,
      address: {
        postalCode: "77777",
        city: "Musterkommune",
        street: "Some street",
        district: null,
        streetNumber: "7",
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: null,
      coordinates: {}
    },
    {
      installationId: "a723ea87-ad71-4ce7-9f83-8d78a704738a",
      marketLocationId: null,
      division: "electricity",
      meterId: "09384626",
      installationDesignation: "Rome",
      premiseTypeText: null,
      referenceNumber: "234",
      reviewState: "inReview",
      isNew: true,
      address: {
        postalCode: "22222",
        city: "Musterkommune",
        street: null,
        district: null,
        streetNumber: null,
        cityExtension: null,
        streetNumberSuffix: null
      },
      clusterId: null,
      coordinates: {}
    }
  ];

  public readonly list$ = of(["First", "Second", "Third", "Fourth", "Fifth", "Six", "Seven"])
    .pipe
    // delay(1000)
    ();

  public onTableAction(event: TableAction<any>): void {
    console.log(event);
  }

  public onClick(): void {
    console.log();
  }
}
