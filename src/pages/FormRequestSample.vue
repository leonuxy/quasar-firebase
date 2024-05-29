<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-virtscroll-table"
      virtual-scroll
      flat
      bordered
      v-model:selected="selected"
      :rows-per-page-options="[100]"
      :virtual-scroll-sticky-size-start="48"
      row-key="index"
      selection="multiple"
      title="List Sample"
      :rows="rows"
      :columns="columns"
      ><template v-slot:top-right>
        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          class="q-ml-md"
          label="Search"
          color="primary"
          @click="dialogSearch = true"
        />
      </template>
    </q-table>
    <!-- :filter="filter" -->
    <!-- <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template> -->
  </div>

  <q-dialog v-model="dialogSearch">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Search</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-input
          class="q-mt-sm"
          outlined
          v-model="text"
          label="Applicant's Name"
        />
        <q-input class="q-mt-sm" outlined v-model="text" label="Department" />
        <q-input class="q-mt-sm" outlined v-model="text" label="Type Product" />
        <q-input class="q-mt-sm" outlined v-model="text" label="Qty" />
        <q-input class="q-mt-sm" outlined v-model="text" label="Area Request" />
        <q-input
          class="q-mt-sm"
          outlined
          v-model="text"
          label="Purpose Request"
        />
        <q-input class="q-mt-sm" outlined v-model="text" label="Request Qty" />
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat @click="closeDialogSearch">Back</q-btn>
        <q-btn color="green-9" @click="closeDialogSearch">Search</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";

const columns = [
  {
    name: "index",
    label: "IDS",
    field: "index",
  },
  {
    name: "name",
    required: true,
    label: "Applicant's Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "dept",
    required: true,
    label: "Department",
    align: "left",
    field: "dept",
    sortable: true,
  },
  {
    name: "type_product",
    required: true,
    label: "Type Product(Varietas)",
    align: "left",
    field: "type_product",
    sortable: true,
  },
  {
    name: "packaging",
    required: true,
    label: "Packaging",
    align: "left",
    field: "packaging",
    sortable: true,
  },
  {
    name: "qty",
    required: true,
    label: "Qty",
    align: "left",
    field: "qty",
    sortable: true,
  },
  {
    name: "area_request",
    align: "center",
    label: "Area Request",
    field: "area_request",
    sortable: true,
  },
  {
    name: "purpose_request",
    align: "center",
    label: "Purpose Sampe Request",
    field: "purpose_request",
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "Status",
    field: "status",
    sortable: true,
  },
];

const seed = [
  {
    name: "Tendi W",
    dept: "Marketing Executive",
    type_product: "Tembakau",
    packaging: "Pack",
    qty: 2,
    area_request: 5,
    purpose_request: "Checking Quality",
    status: "Approved",
  },
  {
    name: "Jul W",
    dept: "Agro",
    type_product: "Biji Kopi",
    packaging: "Pack",
    qty: 1,
    area_request: 5,
    purpose_request: "Checking Quality",
    status: "On Reviewed",
  },
  {
    name: "Jul W",
    dept: "Agro",
    type_product: "Pok Choy",
    packaging: "Pack",
    qty: 13,
    area_request: 5,
    purpose_request: "Checking Quality",
    status: "On Reviewed",
  },
  {
    name: "Arif H",
    dept: "Logistics",
    type_product: "Teh Hijau",
    packaging: "Box",
    qty: 4,
    area_request: 3,
    purpose_request: "Stock Replenishment",
    status: "Approved",
  },
  {
    name: "Rina S",
    dept: "Quality Assurance",
    type_product: "Kopi Bubuk",
    packaging: "Bag",
    qty: 10,
    area_request: 2,
    purpose_request: "Quality Testing",
    status: "On Requested",
  },
  {
    name: "Andi P",
    dept: "Procurement",
    type_product: "Gula Aren",
    packaging: "Jar",
    qty: 8,
    area_request: 4,
    purpose_request: "Supplier Evaluation",
    status: "Approved",
  },
  {
    name: "Budi K",
    dept: "Sales",
    type_product: "Jahe Merah",
    packaging: "Pack",
    qty: 5,
    area_request: 1,
    purpose_request: "Sales Sample",
    status: "Approved",
  },
  {
    name: "Cici R",
    dept: "Marketing Executive",
    type_product: "Tembakau",
    packaging: "Pack",
    qty: 6,
    area_request: 5,
    purpose_request: "Product Demonstration",
    status: "Approved",
  },
  {
    name: "Dewi L",
    dept: "Agro",
    type_product: "Biji Kopi",
    packaging: "Sack",
    qty: 12,
    area_request: 6,
    purpose_request: "Export Preparation",
    status: "Approved",
  },
  {
    name: "Eko B",
    dept: "Finance",
    type_product: "Pok Choy",
    packaging: "Pack",
    qty: 3,
    area_request: 5,
    purpose_request: "Budget Planning",
    status: "Approved",
  },
  {
    name: "Fani T",
    dept: "Operations",
    type_product: "Teh Hijau",
    packaging: "Box",
    qty: 7,
    area_request: 3,
    purpose_request: "Operational Use",
    status: "Approved",
  },
  {
    name: "Gilang M",
    dept: "Logistics",
    type_product: "Kopi Bubuk",
    packaging: "Bag",
    qty: 9,
    area_request: 4,
    purpose_request: "Warehouse Stock",
    status: "Approved",
  },
  {
    name: "Hana S",
    dept: "Quality Assurance",
    type_product: "Gula Aren",
    packaging: "Jar",
    qty: 11,
    area_request: 2,
    purpose_request: "Quality Control",
    status: "Approved",
  },
  {
    name: "Irwan D",
    dept: "Procurement",
    type_product: "Jahe Merah",
    packaging: "Pack",
    qty: 15,
    area_request: 1,
    purpose_request: "New Supplier Testing",
    status: "Approved",
  },
  {
    name: "Joko E",
    dept: "Sales",
    type_product: "Tembakau",
    packaging: "Pack",
    qty: 14,
    area_request: 5,
    purpose_request: "Market Research",
    status: "Approved",
  },
  {
    name: "Kiki H",
    dept: "Marketing Executive",
    type_product: "Biji Kopi",
    packaging: "Pack",
    qty: 16,
    area_request: 6,
    purpose_request: "Client Meeting",
    status: "Approved",
  },
  {
    name: "Lina J",
    dept: "Agro",
    type_product: "Pok Choy",
    packaging: "Pack",
    qty: 18,
    area_request: 3,
    purpose_request: "Harvest Quality Check",
    status: "Approved",
  },
  {
    name: "Mita P",
    dept: "Logistics",
    type_product: "Teh Hijau",
    packaging: "Box",
    qty: 20,
    area_request: 4,
    purpose_request: "Shipment Preparation",
    status: "Approved",
  },
  {
    name: "Nina Q",
    dept: "Quality Assurance",
    type_product: "Kopi Bubuk",
    packaging: "Bag",
    qty: 22,
    area_request: 2,
    purpose_request: "Inspection",
    status: "Approved",
  },
  {
    name: "Oki R",
    dept: "Procurement",
    type_product: "Gula Aren",
    packaging: "Jar",
    qty: 24,
    area_request: 1,
    purpose_request: "Procurement Audit",
    status: "Approved",
  },
];
// we generate lots of rows here
let rows = [];
for (let i = 0; i < 100; i++) {
  rows = rows.concat(seed.slice(0).map((r) => ({ ...r })));
}
rows.forEach((row, index) => {
  row.index = index;
});

export default {
  setup() {
    return {
      columns,
      rows,

      text: ref(""),
      filter: ref([]),
      dialogSearch: ref(false),
      selected: ref([]),
      pagination: ref({
        rowsPerPage: 100,
      }),
    };
  },
  methods: {
    closeDialogSearch() {
      this.dialogSearch = false;
    },
  },
};
</script>

<style lang="sass">
.my-sticky-virtscroll-table
  /* height or max-height is important */
  max-height: 80vh

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: white

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
